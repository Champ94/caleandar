# Caleandar Version 0.9 
Lightweight and library-independent calendar script with optional themes.

Full guide and setup at https://github.com/jujumuncher/caleandar

### Features

Original features:
- Add events to the calendar
- Handles event click

New features:
- Actual day is now highlighted in previous and following months if visible between disabled days
- You can now add multiple events on the same day
- Link and anonymous funcions enabled for different events in the same day
- Monday is now the first day of the week
- Days and months changed in italian language

### Installing
Download the .js files and any of the themes and include them in your page.

### Instantiating
Call the `caleandar()` function with the following 3 optional parameters:
```
caleandar(element, events, settings);
```
Where `element` is an HTML element, `events` is an array of event objects and `settings` is an object of settings.


### Events
An array of event objects to be placed on their respective dates on the calendar.
Example with multiple events on the same day.
```
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
```

### Settings
Below are all the possible settings attributes with example values.
```
var settings={
    Color: '#999',                //(string - color) font color of whole calendar.
    LinkColor: '#333',            //(string - color) font color of event titles.
    NavShow: true,                //(bool) show navigation arrows.
    NavVertical: false,           //(bool) show previous and coming months.
    NavLocation: '#foo',          //(string - element) where to display navigation, if not in default position.
    DateTimeShow: true,           //(bool) show current date.
    DateTimeFormat: 'mmm, yyyy',  //(string - dateformat) format previously mentioned date is shown in.
    DatetimeLocation: '',         //(string - element) where to display previously mentioned date, if not in default position.
    EventClick: '',               //(function) a function that should instantiate on the click of any event. parameters passed in via data link attribute.
    EventTargetWholeDay: false,   //(bool) clicking on the whole date will trigger event action, as opposed to just clicking on the title.
    DisabledDays: [],             //(array of numbers) days of the week to be slightly transparent. ie: [1,6] to fade Sunday and Saturday.
    ModelChange: model            //(array of objects) new data object to pass into calendar (serving suggestion: passing through only the currently selected month's events if working with large dataset.
  }
```