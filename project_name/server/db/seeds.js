use iShare;
db.dropDatabase();

db.shares.insertMany([
  {
    name: "Google",
    category: "Technology",
    number_of_shares: 20,
    date_acquisition: "2017-06-01"
  },
  {
    name: "Facebook",
    category: "Technology",
    number_of_shares: 10,
    date_acquisition: "2019-11-26"
  },
  {
    name: "Barilla",
    category: "Food",
    number_of_shares: 100,
    date_acquisition: "2012-02-14"
  }
]);
