use iShare;
db.dropDatabase();

db.shares.insertMany([
  {
    name: "Google",
    name_share: "GOOG",
    category: "Technology",
    number_of_shares: 20,
    date_acquisition: "2017-06-01",
    web_site: "www.google.co.uk"
  },
  {
    name: "Facebook",
    name_share: "FB",
    category: "Technology",
    number_of_shares: 10,
    date_acquisition: "2019-11-26",
    web_site: "www.facebook.com"
  },
  {
    name: "Barilla",
    name_share: "BAR",
    category: "Food",
    number_of_shares: 100,
    date_acquisition: "2017-02-14",
    web_site: "https://www.barillagroup.com/en"
  }
]);
