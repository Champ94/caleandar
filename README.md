# Lightweight calendar Version 1.0
Lightweight and library-independent calendar script with optional themes.

Full guide and setup at https://github.com/jujumuncher/caleandar

### Features

Original features:
- Add events to the calendar
- Handles event click

New features:
- Actual day is now highlighted in previous and following months if visible between disabled days
- You can now add multiple events on the same day
- Link enabled for different events in the same day
- Monday is now the first day of the week
- Days and months changed in italian language

### Installing
Download the .js files and any of the themes and include them in your page.

### Instantiating
Call the `initLwCalendar()` function with the following 3 optional parameters:
```
initLwCalendar(element, events, settings);
```
Where `element` is an HTML element, `events` is an array of event objects and `settings` is an object of settings.


### Events
An array of event objects to be placed on their respective dates on the calendar.
Example with multiple events on the same day.
```
let events = [
    {
        eventDate: new Date(yyyy, mm, dd),
        title: ['Event One', 'Event Two'],
        link: [
            '#linkEventOne',
            '#linkEventTwo',
        ]
    },
    {
        eventDate: new Date(yyyy, mm, dd),
        title: ['Event Three', 'Event Four'],
        link: [
            '#linkEventThree',
            '#linkEventFour',
        ]
    }
];
```

### Settings
Below are all the possible settings attributes with example values.
```
let options = {
        // Style options
        disabledDays: [],                       // Array of numbers: days of the week to be slightly transparent (days go from 0 to 6)
        // Header options
        headerContainer: '',                    // Element: container in which navigation is displayed
        showHeader: true,                       // Bool: show current date
        showNav: true,                          // Bool: show arrows for navigation
        // Events
        events: function() {},                  // Function: return a new list of events to load
};
```