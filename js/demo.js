var events = [
    {
        'Date': new Date(2018, 1, 7), 
        'Title': ['Evento1', 'Evento2', 'Evento3'], 
        Link: [
            '#linkEvento1', 
            '#linkEvento2',
            '#linkEvento3'
        ]
    },
    {
        'Date': new Date(2018, 1, 14), 
        'Title': ['Evento1', 'Evento2'], 
        Link: [
            '#linkEvento1', 
            function() {
                alert("Click on Evento2!");
            },
        ]
    }
];

var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);
