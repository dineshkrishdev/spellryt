var db = new Dexie("spellryt");

db.version(1).stores({
    a_series: 'word, status',
    b_series: 'word, status',
    c_series: 'word, status',
    d_series: 'word, status',
    e_series: 'word, status',
    f_series: 'word, status',
    g_series: 'word, status',
    h_series: 'word, status',
    i_series: 'word, status',
    j_series: 'word, status',
    k_series: 'word, status',
    l_series: 'word, status',
    m_series: 'word, status',
    n_series: 'word, status',
    o_series: 'word, status',
    p_series: 'word, status',
    q_series: 'word, status',
    r_series: 'word, status',
    s_series: 'word, status',
    t_series: 'word, status',
    u_series: 'word, status',
    v_series: 'word, status',
    w_series: 'word, status',
    x_series: 'word, status',
    y_series: 'word, status',
    z_series: 'word, status'
});

app.controller('prepare', function($location, $http) {

    var selected = $location.search().data;

    if(selected != undefined) {

        $http.get("http://localhost:9005/resources/"+selected+".json")
        .then(function(response) {

            var words = response.data.words;

                

                words.forEach(element => {
                    
                    var obj = new Object();

                    obj.word = element;
                    obj.status = "N";
                    

                    db.table("a_series").put(obj).then (function(){
                        return obj;
                    }).catch(function(error) {
                    alert ("Ooops: " + error);
                    });
                    
                    

                });

        });

        
    } else {


    }

    var wordList = new Array();

    db.table("a_series")
    .where('status')
    .equals('N').each(function(x) {

        var temp = new Object();

        temp.word = x.word;
        temp.status = x.status;

        wordList.push(temp);

        console.log(temp);
    });        

    

});