var schemaBuilder = lf.schema.create('spellryt', 1);

var spellryt;

app.controller('prepare', function($location, $http) {

    var selected = $location.search().data;

    schemaBuilder.createTable('a_series').
    addColumn('id', lf.Type.INTEGER).
    addColumn('word', lf.Type.STRING).
    addColumn('status', lf.Type.BOOLEAN).
    addPrimaryKey(['id']).
    addIndex('idxWord', ['word'], false, lf.Order.DESC);
    
    var word;

    schemaBuilder.connect().then(function(db) {
        spellryt = db;
        
        word = db.getSchema().table('a_series');

        $http.get("/resources/a.json")
        .then(function(response) {
            var words = response.data.words;

            var count = 1;

            words.forEach(element => {

                var obj = new Object();
                obj.id = count;
                obj.word = element;
                obj.status = false;

                var row = word.createRow(obj);
                db.insertOrReplace().into(word).values([row]).exec();
                count ++;
            });

        });
      });


});

var current;

function getData() {

    var table = spellryt.getSchema().table("a_series");

    var test = spellryt.select().
    from(table).
    where(table.status.eq(false)).
    exec().then(function(result) {

        current = result[(Math.floor(Math.random() * result.length))];

        console.log(current);
        
    });
}

function update() {

    var table = spellryt.getSchema().table("a_series");
    
    spellryt.update(table).
    set(table.status, true).
    where(table.id.eq(current.id)).
    exec();

    console.log("updated");
}