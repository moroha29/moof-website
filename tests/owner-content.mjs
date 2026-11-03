/*
 * What the website's check may refuse, and what it may not.
 *
 * The owner edits this site's words and pictures in the website manager, and
 * the manager will not publish anything this file objects to: a publish opens a
 * pull request, waits for `npm test` here, and withdraws the request if it
 * fails. The owner is never shown which test failed — only "the check on your
 * website found a problem" — so anything refused here is a dead end for them.
 *
 * So the rule for this file is narrow: refuse only what would actually break a
 * page. Wording, length, whether two headings match, which of Google's map
 * links was pasted — none of that is the check's business. `owner-content.test`
 * puts the edits a manager can produce back through these rules to keep it
 * that way.
 */

/** Every picture on the site, with the field an owner would recognise. */
export function pictures(site, menu) {
  const items = [...(menu.coreMenu || []), ...(menu.seasonalMenu || []),
    ...(menu.additionalCategories || []).flatMap((group) => group.items || [])];
  return [
    { label: "the logo", value: site.brand?.logoImage },
    { label: "the homepage picture", value: site.hero?.image },
    { label: "the About us picture", value: site.about?.image },
    { label: "the gatherings picture", value: site.events?.image },
    ...items.map((item) => ({ label: `the picture for ${item.name || "a drink"}`, value: item.image })),
  ];
}

/*
 * A map the page will iframe. Google's own "embed a map" link and a link built
 * from coordinates both centre on one place; `?q=` with an address searches,
 * and a search draws every cafe near Moof instead of Moof.
 */
function mapProblem(value) {
  let url;
  try {
    url = new URL(String(value || ""));
  } catch {
    return "The map link is not a web address.";
  }
  if (!/(^|\.)google\.[a-z.]+$/.test(url.hostname)) return "The map link does not go to Google Maps.";
  if (url.pathname.startsWith("/maps/embed")) return null;
  const query = url.searchParams.get("q") || "";
  if (/^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?/.test(query)) return null;
  return "The map link searches for a place name, so the map shows every nearby cafe instead of Moof. Use the embed link from Google Maps, or coordinates.";
}

/**
 * What is wrong with this content, in the owner's words. Empty means publish.
 * `exists` answers whether a `/images/…` path is a file the site ships.
 */
export function problems(site, menu, exists) {
  const found = [];
  const say = (problem) => { if (problem) found.push(problem); };

  for (const { label, value } of pictures(site, menu)) {
    const path = String(value ?? "").trim();
    // No picture yet is a stand-in on the page, not a broken one, so it is
    // allowed; a picture that names a file nobody put there is not.
    if (!path) continue;
    if (!path.startsWith("/")) say(`The address for ${label} is not a picture on this website.`);
    else if (!exists(path)) say(`The picture for ${label} is missing from the website.`);
  }

  if (!String(site.brand?.headerWordmark ?? "").trim()) say("The name at the top of the page is empty.");
  if (!String(site.brand?.footerWordmark ?? "").trim()) say("The name at the foot of the page is empty.");
  say(mapProblem(site.visit?.mapEmbedUrl));

  return found;
}
