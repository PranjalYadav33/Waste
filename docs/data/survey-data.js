// Embedded primary-survey dataset (N=100, 2 Oct 2026).
// Generated from website/data/survey-responses.csv; embedded so survey charts work offline.
// Each row is a 10-character code: [housing, Q2..Q10].
// Housing: G = Gated Society, C = Standalone Building or Chawl, O = Other.
window.SURVEY = {
  meta: { n: 100, window: "2 October 2026, 13:55\u201314:07", file: "data/survey-responses.csv" },
  houses: { G: "Gated Society", C: "Standalone Building or Chawl", O: "Other" },
  questions: [
    { id: "Q1", text: "Housing Type", order: ["G", "C", "O"],
      opts: { G: "Gated Society", C: "Standalone Building or Chawl", O: "Other" } },
    { id: "Q2", text: "Do you keep separate bins for wet and dry waste at home?", order: ["A", "S", "N"],
      opts: { A: "Yes, Always", S: "Sometimes", N: "No, Single bin" } },
    { id: "Q3", text: "If you do not segregate, what is the main reason?", order: ["B", "K", "M", "F"],
      opts: { B: "No separate bins", K: "Lack of kitchen space", M: "Waste collector mixes them anyway", F: "Forgetfulness" } },
    { id: "Q4", text: "How reliable is your daily municipal waste collection?", order: ["V", "D", "I", "X"],
      opts: { V: "Very regular", D: "Delayed by 1 to 2 hours", I: "Irregular", X: "No door to door pickup" } },
    { id: "Q5", text: "Does the collection vehicle have separate compartments for wet and dry waste?", order: ["Y", "N", "U"],
      opts: { Y: "Yes", N: "No, single chamber", U: "Not sure" } },
    { id: "Q6", text: "Have you observed the waste handler or worker mixing your segregated bags?", order: ["F", "O", "N"],
      opts: { F: "Frequently", O: "Occasionally", N: "Never" } },
    { id: "Q7", text: "Do you separate domestic hazardous and sanitary waste (pads, diapers, glass, medicines)?", order: ["S", "W", "D"],
      opts: { S: "Yes, in separate bag", W: "Mixed with wet", D: "Mixed with dry" } },
    { id: "Q8", text: "Are you aware of municipal fines or bye-laws for not segregating?", order: ["Y", "N"],
      opts: { Y: "Yes", N: "No" } },
    { id: "Q9", text: "Would an alert via SMS or WhatsApp 15 minutes before the truck arrives help you hand over waste on time?", order: ["Y", "N"],
      opts: { Y: "Yes", N: "No" } },
    { id: "Q10", text: "What would motivate you most to segregate daily?", order: ["B", "I", "F", "E"],
      opts: { B: "Better bins", I: "Clearer instructions", F: "Strict fines", E: "Lower municipal maintenance fee" } }
  ],
  rows: [
    "OSMXUOSNNB", "GNMINODYNI", "CNKXUFSNYI", "ONBDYFSYYE", "GSBVNOSNYE",
    "GAFXNFWYYI", "GSMDNFSYYI", "CNFDUFWNYF", "ONKINFDYNE", "CNBIYNSYYI",
    "GNBDNNDYYB", "GNKDNODNYE", "OSKDUFDNNB", "CAKVNODYNF", "GAKDUFWYYF",
    "CNKVNFDNNF", "ONFVYFDYYE", "GNMDNFWYNE", "OAFXNFDNNB", "GABDNODYNB",
    "GAKDNFWYYE", "GNKDYFWNNI", "GNMINFWYYE", "CNKXNFWNYI", "ONBINFDYYB",
    "GNMDNOSNNE", "OAKXNFSYYB", "CAFINFSYYB", "OSKINFWNYB", "CNMXNFDNYB",
    "ONFINODYNF", "GAMXUFDYNF", "ONKXNODNYI", "GNFVNFDNYI", "OSBDUFSYYI",
    "ONMDNOWYYI", "OSFDYFWNYI", "ONMXNFDNYI", "OSBVYNWNNI", "CABDNNDYYE",
    "CSKXNFWNNF", "CSKINFDNYF", "GNFXNFDNYE", "GAKIYODNNF", "CSFXNNSYNF",
    "CSFXNOWNYI", "CSMXNFDYYE", "GNMVNFSNYI", "GSFDNFDYYB", "OSBDNNWNYB",
    "GNKDNFWYNI", "ONFXNFWNYB", "CSKXNODNYB", "GAFINFSYYI", "CNFXUFWYNF",
    "CSBDYFDYNI", "GAFIYFDNYE", "GNBXNFWYYF", "CNBVYOWNNF", "GAMDYFSNYF",
    "GSBIYNWYYB", "ONMDNFWYNB", "CSFXNNWYYF", "GNBXUFWNYI", "CABXNFWYYE",
    "CABINNDYYE", "OSBIYFDNYB", "GNKINNWYYB", "GSBINOSYYF", "CSMXNOWYYI",
    "GABDNFWNNI", "ONMDNFWYNB", "GNBIYNDYYF", "GNMDNFWYYE", "GNKDNOWNNF",
    "CNMXNFWYNE", "GABIYFWNYF", "CNFDYFSNYB", "CSBINFSNNF", "GNBIYOWYYB",
    "GNBDUNWYNE", "CNFVNFDYNF", "GNMDNFDYNI", "ONMDNOWYYB", "ONMINFDNNF",
    "OSMDNODNNB", "CNBINOSYNB", "GNFXYODYYB", "CSFDNOWYYB", "CNFXYFSYNI",
    "ONFVNOWNNE", "GNMIYFWNNB", "CSBVUODYNF", "ONBINFDYNE", "CNKVYOSYYI",
    "CABDNODYYE", "CSKVNNWYNB", "GNKDNFWNYE", "ONKIUFWNNI", "GSBVNFDNYF"
  ]
};
