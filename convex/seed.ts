import { mutation } from "./_generated/server";

// export const seed = mutation(async ({ db }) => {
//   const existing = await db.query("sentences").first();
//   if (existing) return;

//   const texts = [
//     "Wiatr niósł po polach zapach deszczu, jakby przypominał o dawno zapomnianych historiach.",
//     "Stary dom skrzypiał pod naporem czasu, lecz wciąż stał dumnie na skraju lasu.",
//     "Nad rzeką unosiła się mgła, miękka jak wspomnienie, które nie chce odejść.",
//     "Miasto budziło się ospale, jakby nie miało odwagi zacząć kolejnego dnia.",
//     "Liście tańczyły na wietrze, szeleszcząc cicho jak sekrety szeptane po zmroku.",
//     "Świt rozlewał się po niebie jak farba, której nikt nie potrafił zatrzymać.",
//     "W ciszy poranka świat wydawał się prostszy, a każdy krok brzmiał jak obietnica.",
//     "Droga wiła się między wzgórzami, prowadząc tam, gdzie kończyły się mapy.",
//     "W jego dłoniach drżał list, który mógł zmienić wszystko.",
//     "Noc była tak ciemna, że nawet gwiazdy zdawały się milczeć.",
//     "Next.js i Convex sprawiają, że tworzenie aplikacji czasu rzeczywistego jest czystą przyjemnością.",
//     "Ta aplikacja to w 90% backend, a Next.js pozwala mi skupić się na logice, zamiast na infrastrukturze.",
//   ];

//   for (const text of texts) {
//     await db.insert("sentences", { text });
//   }
// });

export const seed = mutation(async ({ db }) => {
  const existing = await db.query("sentences").first();
  if (existing) return;

  const texts = [
    "The morning sun painted the sky with soft shades of orange.",
    "A small cat jumped onto the windowsill and stared outside.",
    "The old library smelled of paper, dust, and quiet stories.",
    "She typed quickly, hoping to finish the task before noon.",
    "A cold breeze swept through the park as leaves danced around.",
    "He opened the door slowly, unsure of what he would find.",
    "The city lights flickered like stars scattered across the ground.",
    "A gentle melody drifted from the radio in the corner.",
    "They walked along the river, talking about nothing and everything.",
    "The clock ticked loudly, reminding him that time never stops.",
  ];

  for (const text of texts) {
    await db.insert("sentences", { text });
  }
});
