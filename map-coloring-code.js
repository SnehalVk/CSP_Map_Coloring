//VARIABLES
var currentCountrySelected = null;
var countryConstraintGraph = [];
var countryConstraintCount = [];
var mapcolours = ["R", "G", "B", "Y", "BL"];
var stack = [];
var edges = 0; //TOTAL NUMBER OF STATES initially V
var color = [];
var dataSet = [];
var currentMap = -1;
var currentState;
var isAlgorithmSelected = false;
var isHeuristicsUsed = false;
var numberOfBacktrack = 0;

var united_states_constraint_graph = [
	[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], //Alabama
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Alaska
	[0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], //Arizona
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0], //Arkansas
	[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], //California
	[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1], //Colorado
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], //Connecticut
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], //Delaware
	[1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Florida   
	[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0], //Georgia
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Hawaii
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1,0,0,1], //Idaho
	[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], //Illinois
	[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Indiana
	[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0], //Iowa
	[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Kansas
	[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0], //Kentucky
	[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], //Louisiana
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Maine
	[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0], //Maryland
	[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0], //Massachusetts
	[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], //Michigan
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0], //Minnesota
	[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], //Mississippi
	[0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0], //Missouri
	[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1], //Montana
	[0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1], //Nebraska
	[0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0], //Nevada
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], //New Hampshire
	[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], //New jersey
	[0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0], //New Mexico
	[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0], //New york
	[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0], //North Carolina
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], //North Dakota
	[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0], //Ohio
	[0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], //Oklahoma
	[0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], //Oregon
	[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Pennsylvania
	[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Rhode Island
	[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // South Carolina
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], //South Dakota
	[1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], //Tennessee
	[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Texas
	[0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Utah
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Vermont
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0], //Virginia
	[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], //Washington
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0], //West Virginia
	[0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Wisconsin
	[0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], //Wyoming
];

var united_states_constraint_count = [
  {
    id: "US.AL",
    state: "Alabama",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 4
  }, //1
  {
    id: "US.AK",
    state: "Alaska",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 0
  }, //1
  {
    id: "US.AZ",
    state: "Arizona",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //3
  {
    id: "US.AR",
    state: "Arkansas",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //4
  {
    id: "US.CA",
    state: "California",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 3
  }, //5
  {
    id: "US.CO",
    state: "Colorado",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 7
  }, //6
  {
    id: "US.CT",
    state: "Connecticut",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 3
  }, //7
  {
    id: "US.DE",
    state: "Delaware",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 3
  }, //8
  {
    id: "US.FL",
    state: "Florida",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 2
  }, //9
  {
    id: "US.GA",
    state: "Georgia",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //10
  {
    id: "US.HI",
    state: "Hawaii",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 0
  }, //11
  {
    id: "US.ID",
    state: "Idaho",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 6
  }, //12
  {
    id: "US.IL",
    state: "Illinois",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 6
  }, //13
  {
    id: "US.IN",
    state: "Indiana",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 4
  }, //14
  {
    id: "US.IA",
    state: "Iowa",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 6
  }, //15
  {
    id: "US.KS",
    state: "Kansas",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 4
  }, //16
  {
    id: "US.KY",
    state: "Kentucky",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 7
  }, //17
  {
    id: "US.LA",
    state: "Louisiana",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 3
  }, //18
  {
    id: "US.ME",
    state: "Maine",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 1
  }, //19
  {
    id: "US.MD",
    state: "Maryland",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 4
  }, //20
  {
    id: "US.MA",
    state: "Massachusetts",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //21
  {
    id: "US.MI",
    state: "Michigan",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //22
  {
    id: "US.MN",
    state: "Minnesota",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //23
  {
    id: "US.MS",
    state: "Mississippi",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 4
  }, //24
  {
    id: "US.MO",
    state: "Missouri",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 8
  }, //25
  {
    id: "US.MT",
    state: "Montana",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 4
  }, //26
  {
    id: "US.NE",
    state: "Nebraska",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //27
  {
    id: "US.NV",
    state: "Nevada",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 6
  }, //28
  {
    id: "US.NH",
    state: "New Hampshire",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 3
  }, //29
  {
    id: "US.NJ",
    state: "New Jersey",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 3
  }, //30
  {
    id: "US.NM",
    state: "New Mexico",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //31
  {
    id: "US.NY",
    state: "New York",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 6
  }, //32
  {
    id: "US.NC",
    state: "North Carolina",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 4
  }, //33
  {
    id: "US.ND",
    state: "North Dakota",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 3
  }, //34
  {
    id: "US.OH",
    state: "Ohio",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //35
  {
    id: "US.OK",
    state: "Oklahoma",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 6
  }, //36
  {
    id: "US.OR",
    state: "Oregon",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 4
  }, //37
  {
    id: "US.PA",
    state: "Pennsylvania",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //38
  {
    id: "US.RI",
    state: "Rhode Island",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 3
  }, //39
  {
    id: "US.SC",
    state: "South Carolina",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 2
  }, //40
  {
    id: "US.SD",
    state: "South Dakota",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 6
  }, //41
  {
    id: "US.TN",
    state: "Tennessee",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 8
  }, //42
  {
    id: "US.TX",
    state: "Texas",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 4
  }, //43
  {
    id: "US.UT",
    state: "Utah",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //44
  {
    id: "US.VT",
    state: "Vermont",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 3
  }, //45
  {
    id: "US.VA",
    state: "Virginia",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //46
  {
    id: "US.WA",
    state: "Washington",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 2
  }, //47
  {
    id: "US.WV",
    state: "West Virginia",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 4
  }, //48
  {
    id: "US.WI",
    state: "Wisconsin",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 5
  }, //49
  {
    id: "US.WY",
    state: "Wyoming",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 4
  }, //50
  {
    id: "US.DC",
    state: "District of Columbia",
    domain: ["R", "G", "B", "Y", "BL"],
    color: null,
    count: 6
  }
];

var united_states_dataSet = [
  {
    id: "US.AL",
    fill: null
  }, //1
  {
    id: "US.AK",
    fill: null
  }, //1
  {
    id: "US.AZ",
    fill: null
  }, //3
  {
    id: "US.AR",
    fill: null
  }, //4
  {
    id: "US.CA",
    fill: null
  }, //5
  {
    id: "US.CO",
    fill: null
  }, //6
  {
    id: "US.CT",
    fill: null
  }, //7
  {
    id: "US.DE",
    fill: null
  }, //8
  {
    id: "US.FL",
    fill: null
  }, //9
  {
    id: "US.GA",
    fill: null
  }, //10
  {
    id: "US.HI",
    fill: null
  }, //11
  {
    id: "US.ID",
    fill: null
  }, //12
  {
    id: "US.IL",
    fill: null
  }, //13
  {
    id: "US.IN",
    fill: null
  }, //14
  {
    id: "US.IA",
    fill: null
  }, //15
  {
    id: "US.KS",
    fill: null
  }, //16
  {
    id: "US.KY",
    fill: null
  }, //17
  {
    id: "US.LA",
    fill: null
  }, //18
  {
    id: "US.ME",
    fill: null
  }, //19
  {
    id: "US.MD",
    fill: null
  }, //20
  {
    id: "US.MA",
    fill: null
  }, //21
  {
    id: "US.MI",
    fill: null
  }, //22
  {
    id: "US.MN",
    fill: null
  }, //23
  {
    id: "US.MS",
    fill: null
  }, //24
  {
    id: "US.MO",
    fill: null
  }, //25
  {
    id: "US.MT",
    fill: null
  }, //26
  {
    id: "US.NE",
    fill: null
  }, //27
  {
    id: "US.NV",
    fill: null
  }, //28
  {
    id: "US.NH",
    fill: null
  }, //29
  {
    id: "US.NJ",
    fill: null
  }, //30
  {
    id: "US.NM",
    fill: null
  }, //31
  {
    id: "US.NY",
    fill: null
  }, //32
  {
    id: "US.NC",
    fill: null
  }, //33
  {
    id: "US.ND",
    fill: null
  }, //34
  {
    id: "US.OH",
    fill: null
  }, //35
  {
    id: "US.OK",
    fill: null
  }, //36
  {
    id: "US.OR",
    fill: null
  }, //37
  {
    id: "US.PA",
    fill: null
  }, //38
  {
    id: "US.RI",
    fill: null
  }, //39
  {
    id: "US.SC",
    fill: null
  }, //40
  {
    id: "US.SD",
    fill: null
  }, //41
  {
    id: "US.TN",
    fill: null
  }, //42
  {
    id: "US.TX",
    fill: null
  }, //43
  {
    id: "US.UT",
    fill: null
  }, //44
  {
    id: "US.VT",
    fill: null
  }, //45
  {
    id: "US.VA",
    fill: null
  }, //46
  {
    id: "US.WA",
    fill: null
  }, //47
  {
    id: "US.WV",
    fill: null
  }, //48
  {
    id: "US.WI",
    fill: null
  }, //49
  {
    id: "US.WY",
    fill: null
  }, //50
  {
    id: "US.DC",
    fill: null
  }
];

var united_states_color_domain = ["R", "G", "B", "Y", "BL"];

var australian_constraint_graph = [
  [0, 1, 1, 0, 0, 0, 0], //Western Australia
  [1, 0, 1, 1, 0, 0, 0], //Northern Territory
  [1, 1, 0, 1, 1, 1, 0], //South Australia
  [0, 1, 1, 0, 1, 0, 0], //Queensland
  [0, 0, 1, 1, 0, 1, 0], //New South Wales
  [0, 0, 1, 0, 1, 0, 0], //Victoria
  [0, 0, 0, 0, 0, 0, 0] //Tasmania
];

var australian_constraint_count = [
  {
    id: "AU.WA",
    state: "Western Australia",
    domain: ["R", "G", "B","Y","BL"],
    color: null,
    count: 2
  },
  {
    id: "AU.NT",
    state: "Northern Territory",
    domain: ["R", "G", "B","Y","BL"],
    color: null,
    count: 3
  },
  {
    id: "AU.SA",
    state: "South Australia",
    domain: ["R", "G", "B","Y","BL"],
    color: null,
    count: 5
  },
  {
    id: "AU.QL",
    state: "Queensland",
    domain: ["R", "G", "B","Y","BL"],
    color: null,
    count: 3
  },
  {
    id: "AU.NS",
    state: "North South Wales",
    domain: ["R", "G", "B","Y","BL"],
    color: null,
    count: 3
  },
  {
    id: "AU.VI",
    state: "Victoria",
    domain: ["R", "G", "B","Y","BL"],
    color: null,
    count: 2
  },
  {
    id: "AU.TS",
    state: "Tasmania",
    domain: ["R", "G", "B","Y","BL"],
    color: null,
    count: 0
  }
];

var australia_dataSet = [
  {
    id: "AU.WA",
    fill: null
  },
  {
    id: "AU.NT",
    fill: null
  },
  {
    id: "AU.SA",
    fill: null
  },
  {
    id: "AU.QL",
    fill: null
  },
  {
    id: "AU.NS",
    fill: null
  },
  {
    id: "AU.VI",
    fill: null
  },
  {
    id: "AU.TS",
    fill: null
  }
];

var australia_color_domain = ["R", "G", "B","Y","BL"];

//FUNCTIONS

//Selects the country of whose map has to be colored
function selectCountry(countryName) {
  currentCountrySelected = countryName;
  initializeVariables();
  resetMapView();
  initializeMap();
}

//Initializes all class level variables
function initializeVariables() {
  if (currentCountrySelected == "United States") {
    countryConstraintGraph = united_states_constraint_graph;
    countryConstraintCount = united_states_constraint_count;
    mapcolours = united_states_color_domain;
    dataSet = united_states_dataSet;
    edges = countryConstraintGraph.length;
    for (let i = 0; i < edges; i++) {
      stack.push([]);
    }
  } else if (currentCountrySelected == "Australia") {
    countryConstraintGraph = australian_constraint_graph;
    countryConstraintCount = australian_constraint_count;
	mapcolours = australia_color_domain;
    dataSet = australia_dataSet;
    edges = countryConstraintGraph.length;
    for (let i = 0; i < edges; i++) {
      stack.push([]);
    }
  } else {
    console.log("Country selection not proper");
  }
}

//Initializes and displays map on the screen
function initializeMap() {
  let map = anychart.map();
  if (currentCountrySelected == "United States") {
	map.geoData(anychart.maps.united_states_of_america);
  } else {
	map.geoData(anychart.maps.australia);
  }
  map.scale().gap(0.15);
  map.interactivity(false);
  var series = map.choropleth(dataSet);
  series.labels(true);
  series.tooltip(true);
  map.container("container");
  map.draw();
}

//Chooses the maximum constraints and sort it accordingly all at once.
function sortingBasedOnHighConstraintState() {
  for (var i = 0; i < countryConstraintCount.length; i++) {
    for (var j = i + 1; j < countryConstraintCount.length; j++) {
      if (countryConstraintCount[i].count < countryConstraintCount[j].count) {
        var temp = countryConstraintCount[i];
        countryConstraintCount[i] = countryConstraintCount[j];
        countryConstraintCount[j] = temp;
      }
    }
  }
}

function heuristicBasedMaxConstrainedState() {
  sortingBasedOnHighConstraintState();
  for (var j = i + 1; j < countryConstraintCount.length; j++) {
    for (let k = 0; k < countryConstraintGraph.length; k++) {
      let f = countryConstraintGraph[j][i];
      if (f.edge) {
        console.log("It is an edge");
      }
    }
    if (countryConstraintCount[i].color == null) {
      return countryConstraintCount[i]; //returns an element with max constraints and whose color is not yet assigned
    }
  }
}

//Function to check whether the assigned color is not clashing with the color to be assigned to its neighbouring state
function isConsistentMap(v, graph, color, c) {
  for (var i = 0; i < edges; i++) {
    if (graph[v][i] == 1 && c == color[i]) return false;
  }
  return true;
}

//A common function which uses DFS with Forward checking algorithm (With and Without Heuristics)
function forwardCheckingAlgo(graph, m, color, v,isHeuristicsUsed) {
	if (v == edges) return true;
	
	if(isHeuristicsUsed){
		var heuristics = true;
		heuristicBasedMaxConstrainedState();
	}

  if (countryConstraintCount[v].domain.length === 0) {
    v--;
    console.log("HERE -----", v);
    var colorToRestore = countryConstraintCount[v].color;
    console.log("COLOUR----------", colorToRestore);
    for (var i = 0; i < edges; i++) {
      if (graph[v][i] == 1) {
        stack[i] = stack[i].filter(e => e != colorToRestore);
        if (!countryConstraintCount[i].domain.includes(colorToRestore)) {
          if (colorToRestore == "R") {
            countryConstraintCount[i].domain.splice(0, 0, colorToRestore);
          } else if (colorToRestore == "G") {
            countryConstraintCount[i].domain.splice(1, 0, colorToRestore);
          } else if (colorToRestore == "B") {
            countryConstraintCount[i].domain.splice(2, 0, colorToRestore);
          } else if (colorToRestore == "Y") {
            countryConstraintCount[i].domain.splice(3, 0, colorToRestore);
          }
          if (colorToRestore == "BL") {
            countryConstraintCount[i].domain.splice(0, 0, colorToRestore);
          }
        }
      }
    }
    console.log(countryConstraintCount);
  } else {
    for (var c = 0; c < mapcolours.length; c++) {
      if (isConsistentMap(v, graph, color, countryConstraintCount[v].domain[c])) {
        color[v] = countryConstraintCount[v].domain[c];
        var colorAssigned = countryConstraintCount[v].domain[c];
        if (countryConstraintCount[v].color != null) {
          var colorToRestore = countryConstraintCount[v].color;
          for (var i = 0; i < edges; i++) {
            if (graph[v][i] == 1) {
              stack[i] = stack[i].filter(e => e != colorAssigned);
              if (!countryConstraintCount[i].domain.includes(colorToRestore)) {
                if (colorToRestore == "R") {
                  countryConstraintCount[i].domain.splice(0, 0, colorToRestore);
                } else if (colorToRestore == "G") {
                  countryConstraintCount[i].domain.splice(1, 0, colorToRestore);
                } else if (colorToRestore == "B") {
                  countryConstraintCount[i].domain.splice(2, 0, colorToRestore);
                } else if (colorToRestore == "Y") {
                  countryConstraintCount[i].domain.splice(3, 0, colorToRestore);
                }
                if (colorToRestore == "BL") {
                  countryConstraintCount[i].domain.splice(0, 0, colorToRestore);
                }
              }
            }
          }
        }
        countryConstraintCount[v].color = colorAssigned;

        for (var i = 0; i < edges; i++) {
          if (graph[v][i] == 1) {
            countryConstraintCount[i].domain = countryConstraintCount[
              i
            ].domain.filter(e => e !== colorAssigned);
            if (!stack[i].includes(colorAssigned)) stack[i].push(colorAssigned);
          }
				}
				
        if (forwardCheckingAlgo(graph, m, color, v + 1)) return true;
      }
      color[v] = null;
    }
  }
  return false;
}

//A common function which uses DFS with Backtracking algorithm (With and Without Heuristics)
function backTrackingAlgo(graph, m, color, v,isHeuristicsUsed) {
  if (v == edges) return true;

	if(isHeuristicsUsed){
		var heuristics = true;
		heuristicBasedMaxConstrainedState();
	}

  for (var c = 0; c < mapcolours.length; c++) {
    if (isConsistentMap(v, graph, color, countryConstraintCount[v].domain[c])) {
      color[v] = countryConstraintCount[v].domain[c];
      if (backTrackingAlgo(graph, m, color, v + 1)) return true;

      color[v] = null;
	  numberOfBacktrack++;
	}
  }
  return false;
}

//A common function which uses DFS using Forward checking with Singleton domain algorithm (With and Without Heuristics)
function singletonDomain1(graph, m, color, v,isHeuristicsUsed) {
  if (v == edges) return true;
  console.log("Graph", graph);
  console.log("M", m);
  console.log("Color", color);
  console.log(countryConstraintCount);
	console.log(v);

	if(isHeuristicsUsed){
		var heuristics = true;
		heuristicBasedMaxConstrainedState();
	}

  if (isConsistentMap(v, graph, color, countryConstraintCount[v].domain[0])) {
    color[v] = countryConstraintCount[v].domain[0];
    var colorAssigned = countryConstraintCount[v].domain[0];
    countryConstraintCount[v].color = colorAssigned;
    for (var i = 0; i < edges; i++) {
      if (graph[v][i] == 1) {
        countryConstraintCount[i].domain = countryConstraintCount[
          i
        ].domain.filter(e => e !== colorAssigned);
        if (!stack[i].includes(colorAssigned)) stack[i].push(colorAssigned);
      }
      if (
        countryConstraintCount[i].domain.length === 1 &&
        countryConstraintCount[i].color == null
      ) {
        console.log("Singleton", i);
        singleton(graph, i);
      }
    }

    if (singletonDomain1(graph, m, color, v + 1)) return true;
  }
  console.log("Values", countryConstraintCount);
}

function singleton(graph, v) {
  color[v] = countryConstraintCount[v].domain[0];
  countryConstraintCount[v].color = countryConstraintCount[v].domain[0];
  color[v] = countryConstraintCount[v].domain[0];
  var colorAssigned = countryConstraintCount[v].domain[0];
  for (var i = 0; i < edges; i++) {
    if (graph[v][i] == 1) {
      countryConstraintCount[i].domain = countryConstraintCount[
        i
      ].domain.filter(e => e !== colorAssigned);
      if (!stack[i].includes(colorAssigned)) stack[i].push(colorAssigned);
    }
    if (
      countryConstraintCount[i].domain.length === 1 &&
      countryConstraintCount[i].color == null
    ) {
      console.log("Singleton", i);
      singleton(graph, i);
    }
  }
  console.log("Values", countryConstraintCount);
}

var color = [edges];
for (var i = 0; i < edges; i++) {
  color[i] = null;
}

function printSolution(color) {
  for (var i = 0; i < edges; i++) {
    switch (color[i]) {
      case "R":
        color[i] = "RED";
        break;
      case "G":
        color[i] = "GREEN";
        break;
      case "B":
        color[i] = "BLUE";
        break;
      case "Y":
        color[i] = "YELLOW";
        break;
      case "BL":
        color[i] = "Grey";
        break;
    }
    countryConstraintCount[i].color = color[i];
  }
  console.log("Solution Exists: Following" + " are the assigned colors");
  for (var i = 0; i < edges; i++) console.log(" " + color[i] + " ");

  console.log(countryConstraintCount);
}

function graphColoringCall(choice) {
	//debugger
  switch (choice) {
    case "depth-first":
      if (currentCountrySelected) {
				isAlgorithmSelected = true;
				isHeuristicsUsed = false;
        var t0 = performance.now();
        $("#forward").attr("disabled", "disabled");
        $("#singleton").attr("disabled", "disabled");
        $("#depthHeur").attr("disabled", "disabled");
        $("#singletonHeur").attr("disabled", "disabled");
        $("#forwardHeur").attr("disabled", "disabled");
        for (var i = 0; i < countryConstraintCount.length; i++) {
          dataSet[i].fill = null;
        }
        backTrackingAlgo(countryConstraintGraph, mapcolours.length, color, 0,isHeuristicsUsed);
		console.log("Number Of backTracks : " + numberOfBacktrack);
        printSolution(color);
        var map = anychart.map();
        dataSet[0].fill = countryConstraintCount[0].color;
        currentState = 0;
        map.scale().gap(0.15);
        map.interactivity(false);
        if (currentCountrySelected == "United States") {
		    map.geoData(anychart.maps.united_states_of_america);
        } else {
		    map.geoData(anychart.maps.australia);
        }
        var series = map.choropleth(dataSet);
        series.labels(true);
        series.tooltip(true);
        var mapContainer = document.getElementById("container");
        mapContainer.innerHTML = "";
        mapContainer.innerHTML += "Depth First:";
        mapContainer.style.fontWeight = "bold";
        map.container("container");
        map.draw();
        initializeMap();
        map.draw();
        currentMap = 0;
				var t1 = performance.now();
				var outputTime = document.getElementById("outputTime");
				outputTime.innerHTML += "Depth First completed in " + (t1 - t0) + " milliseconds";
		 if (currentCountrySelected == "United States") {
			 console.log("Chromatic Number for United States is 5.");
		 } else{
			console.log("Chromatic Number for Australia is 3.");
		 }
        console.log("Call for Depth First " + (t1 - t0) + " milliseconds.");
        return true;
      } else {
        alert("Please select a country to proceed");
        return false;
      }

    case "forward-checking":
      if (currentCountrySelected) {
        $("#depth").attr("disabled", "disabled");
        $("#singleton").attr("disabled", "disabled");
        $("#depthHeur").attr("disabled", "disabled");
        $("#singletonHeur").attr("disabled", "disabled");
        $("#forwardHeur").attr("disabled", "disabled");
				isAlgorithmSelected = true;
				isHeuristicsUsed = false;
        var t0 = performance.now();
        for (var i = 0; i < countryConstraintCount.length; i++) {
          dataSet[i].fill = null;
        }
        forwardCheckingAlgo(countryConstraintGraph, mapcolours.length, color, 0,isHeuristicsUsed);
        printSolution(color);
        var map = anychart.map();
        dataSet[0].fill = countryConstraintCount[0].color;
        currentState = 0;
        map.scale().gap(0.15);
        map.interactivity(false);
        if (currentCountrySelected == "United States") {
          map.geoData(anychart.maps.united_states_of_america);
        } else {
          map.geoData(anychart.maps.australia);
        }
        var series = map.choropleth(dataSet);
        series.labels(true);
        series.tooltip(true);
        var mapContainer = document.getElementById("container");
        mapContainer.innerHTML = "";
        mapContainer.innerHTML += "Depth first using forward checking:";
        mapContainer.style.fontWeight = "bold";
        map.container("container");
        map.draw();
        currentMap = 1;
				var t1 = performance.now();
				var outputTime = document.getElementById("outputTime");
				outputTime.innerHTML += "Forward Checking completed in " + (t1 - t0) + " milliseconds";
		if (currentCountrySelected == "United States") {
			console.log("Chromatic Number for United States is 5.");
		} else{
			console.log("Chromatic Number for Australia is 3.");
		}
        console.log(
          "Call for Forward Checking " + (t1 - t0) + " milliseconds."
        );
        return true;
      } else {
        alert("Please select a country to proceed");
        return false;
      }

    case "singleton":
      if (currentCountrySelected) {
				isAlgorithmSelected = true;
				isHeuristicsUsed = false;
        $("#depth").attr("disabled", "disabled");
        $("#forward").attr("disabled", "disabled");
        $("#depthHeur").attr("disabled", "disabled");
        $("#singletonHeur").attr("disabled", "disabled");
        $("#forwardHeur").attr("disabled", "disabled");
        var t0 = performance.now();

        for (var i = 0; i < countryConstraintCount.length; i++) {
          dataSet[i].fill = null;
        }
        singletonDomain1(countryConstraintGraph, mapcolours.length, color, 0,isHeuristicsUsed);
        printSolution(color);
        var map = anychart.map();
        dataSet[0].fill = countryConstraintCount[0].color;
        currentState = 0;
        map.scale().gap(0.15);
        map.interactivity(false);
        if (currentCountrySelected == "United States") {
          map.geoData(anychart.maps.united_states_of_america);
        } else {
          map.geoData(anychart.maps.australia);
        }
        var series = map.choropleth(dataSet);
        series.labels(true);
        series.tooltip(true);
        var mapContainer = document.getElementById("container");
        mapContainer.innerHTML = "";
        mapContainer.innerHTML +=
          "Depth first using forward checking (Singleton Domain):";
        mapContainer.style.fontWeight = "bold";
        map.container("container");
        map.draw();
        currentMap = 2;
				var t1 = performance.now();
				var outputTime = document.getElementById("outputTime");
				outputTime.innerHTML += "Forward Checking With Heuristics (Singleton) completed in " + (t1 - t0) + " milliseconds";
		 if (currentCountrySelected == "United States") {
			 console.log("Chromatic Number for United States is 5.");
		 } else{
			console.log("Chromatic Number for Australia is 3.");
		 }
        console.log("Call for Singleton " + (t1 - t0) + " milliseconds.");
        return true;
      } else {
        alert("Please select a country to proceed");
        return false;
      }

    case "depth-first-with-heuristics":
      if (currentCountrySelected) {
				isAlgorithmSelected = true;
				isHeuristicsUsed = true;
        var t0 = performance.now();
        $("#forward").attr("disabled", "disabled");
        $("#singleton").attr("disabled", "disabled");
        $("#depth").attr("disabled", "disabled");
        $("#singletonHeur").attr("disabled", "disabled");
        $("#forwardHeur").attr("disabled", "disabled");
        for (var i = 0; i < countryConstraintCount.length; i++) {
          dataSet[i].fill = null;
        }
        backTrackingAlgo(countryConstraintGraph, mapcolours.length, color, 0,isHeuristicsUsed);
        printSolution(color);
        var map = anychart.map();
        dataSet[0].fill = countryConstraintCount[0].color;
        currentState = 0;
        map.scale().gap(0.15);
        map.interactivity(false);
        if (currentCountrySelected == "United States") {
          map.geoData(anychart.maps.united_states_of_america);
        } else {
          map.geoData(anychart.maps.australia);
        }
        var series = map.choropleth(dataSet);
        series.labels(true);
        series.tooltip(true);
        var mapContainer = document.getElementById("container");
        mapContainer.innerHTML = "";
        mapContainer.innerHTML += "Depth First:";
        mapContainer.style.fontWeight = "bold";
        map.container("container");
        map.draw();
        initializeMap();
        map.draw();
        currentMap = 3;
				var t1 = performance.now();
				var outputTime = document.getElementById("outputTime");
				outputTime.innerHTML += "Depth First With Heuristics completed in " + (t1 - t0) + " milliseconds";
		if (currentCountrySelected == "United States") {
			 console.log("Chromatic Number for United States is 5.");
		} else{
			console.log("Chromatic Number for Australia is 3.");
		}
        console.log("Call for Depth First With Heuristics" + (t1 - t0) + " milliseconds.");
        return true;
      } else {
        alert("Please select a country to proceed");
        return false;
      }
    case "forward-checking-with-heuristics":
      if (currentCountrySelected) {
        $("#depth").attr("disabled", "disabled");
        $("#singleton").attr("disabled", "disabled");
        $("#depthHeur").attr("disabled", "disabled");
        $("#singletonHeur").attr("disabled", "disabled");
        $("#forward").attr("disabled", "disabled");
				isAlgorithmSelected = true;
				isHeuristicsUsed = true;
        var t0 = performance.now();
        for (var i = 0; i < countryConstraintCount.length; i++) {
          dataSet[i].fill = null;
        }
        forwardCheckingAlgo(countryConstraintGraph, mapcolours.length, color, 0,isHeuristicsUsed);
        printSolution(color);
        var map = anychart.map();
        dataSet[0].fill = countryConstraintCount[0].color;
        currentState = 0;
        map.scale().gap(0.15);
        map.interactivity(false);
        if (currentCountrySelected == "United States") {
          map.geoData(anychart.maps.united_states_of_america);
        } else {
          map.geoData(anychart.maps.australia);
        }
        var series = map.choropleth(dataSet);
        series.labels(true);
        series.tooltip(true);
        var mapContainer = document.getElementById("container");
        mapContainer.innerHTML = "";
        mapContainer.innerHTML += "Depth first using forward checking:";
        mapContainer.style.fontWeight = "bold";
        map.container("container");
        map.draw();
        currentMap = 4;
				var t1 = performance.now();
				var outputTime = document.getElementById("outputTime");
				outputTime.innerHTML += "Forward Checking With Heuristics completed in " + (t1 - t0) + " milliseconds";
		 if (currentCountrySelected == "United States") {
			 console.log("Chromatic Number for United States is 5.");
		 } else{
			console.log("Chromatic Number for Australia is 3.");
		 }
        console.log(
          "Forward Checking With Heuristics completed in " + (t1 - t0) + " milliseconds."
        );
        return true;
      } else {
        alert("Please select a country to proceed");
        return false;
      }

    case "singleton-with-heuristics":
      if (currentCountrySelected) {
				isAlgorithmSelected = true;
				isHeuristicsUsed = true;
        $("#depth").attr("disabled", "disabled");
        $("#forward").attr("disabled", "disabled");
        $("#depthHeur").attr("disabled", "disabled");
        $("#singleton").attr("disabled", "disabled");
        $("#forwardHeur").attr("disabled", "disabled");
        var t0 = performance.now();

        for (var i = 0; i < countryConstraintCount.length; i++) {
          dataSet[i].fill = null;
        }
        singletonDomain1(countryConstraintGraph, mapcolours.length, color, 0,isHeuristicsUsed);
        printSolution(color);
        var map = anychart.map();
        dataSet[0].fill = countryConstraintCount[0].color;
        currentState = 0;
        map.scale().gap(0.15);
        map.interactivity(false);
        if (currentCountrySelected == "United States") {
          map.geoData(anychart.maps.united_states_of_america);
        } else {
          map.geoData(anychart.maps.australia);
        }
        var series = map.choropleth(dataSet);
        series.labels(true);
        series.tooltip(true);
        var mapContainer = document.getElementById("container");
        mapContainer.innerHTML = "";
        mapContainer.innerHTML +=
          "Depth first using forward checking (Singleton Domain):";
        mapContainer.style.fontWeight = "bold";
        map.container("container");
        map.draw();
        currentMap = 5;
				var t1 = performance.now();
				var outputTime = document.getElementById("outputTime");
				outputTime.innerHTML += "Forward Checking With Heuristics (Singleton) completed in " + (t1 - t0) + " milliseconds";
		if (currentCountrySelected == "United States") {
			 console.log("Chromatic Number for United States is 5.");
		} else{
			console.log("Chromatic Number for Australia is 3.");
		}       
	   console.log("Call for Singleton With Heuristics" + (t1 - t0) + " milliseconds.");
        return true;
      } else {
        alert("Please select a country to proceed");
        return false;
      }

    case "next-state":
      if (isAlgorithmSelected) {
        var map = anychart.map();
        currentState++;
        if (currentState == countryConstraintCount.length) {
          alert("All the state are shown");
          var mapContainer = document.getElementById("container");
          mapContainer.innerHTML = "";
          window.location.reload();
          return true;
				}
        dataSet[currentState].fill = countryConstraintCount[currentState].color;
        map.scale().gap(0.15);
        map.interactivity(false);
        if (currentCountrySelected == "United States") {
          map.geoData(anychart.maps.united_states_of_america);
        } else {
          map.geoData(anychart.maps.australia);
        }
        var series = map.choropleth(dataSet);
        series.labels(true);
        series.tooltip(true);
        var mapContainer = document.getElementById("container");
        mapContainer.innerHTML = "";
        if (currentMap == 0) mapContainer.innerHTML += "Depth First:";
        else if (currentMap == 1)
          mapContainer.innerHTML += "Depth first using forward checking:";
        else if (currentMap == 2)
          mapContainer.innerHTML +=
						"Depth first using forward checking (Singleton Domain):";
				else if (currentMap == 3) mapContainer.innerHTML += "Depth First With Heuristics:";
				else if (currentMap == 4)
					mapContainer.innerHTML += "Depth first using forward checking With Heuristics:";
				else if (currentMap == 5)
					mapContainer.innerHTML +=
						"Depth first using forward checking (Singleton Domain) With Heuristics:";
        mapContainer.style.fontWeight = "bold";
        map.container("container");
        map.draw();
        return true;
      } else {
        alert("Please choose an algorithm");
        return false;
      }
  }
}

//resets The map view
function resetMapView() {
  var mapContainer = document.getElementById("container");
  mapContainer.innerHTML = "";
}
