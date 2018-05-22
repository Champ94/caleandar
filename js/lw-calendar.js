const months = ['GENNAIO', 'FEBBRAIO', 'MARZO', 'APRILE', 'MAGGIO', 'GIUGNO', 'LUGLIO', 'AGOSTO', 'SETTEMBRE', 'OTTOBRE', 'NOVEMBRE', 'DICEMBRE'];
const daysLabels = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'];

const leftArrow = `<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" class="nav-style" viewBox="0 0 375.1 650.6"><style type="text/css">.st0{display:none;}.st1{fill:#FFFFFF;}.nav-style{transform:rotate(180deg);}</style><polygon class="st1" points="45.1 650.6 0 605.5 284.9 320.6 9.4 45.1 54.5 0 375.1 320.6"/></svg>`;
const rightArrow = `<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 375.1 650.6"><style type="text/css">.st0{display:none;}.st1{fill:#FFFFFF;}</style><polygon class="st1" points="45.1 650.6 0 605.5 284.9 320.6 9.4 45.1 54.5 0 375.1 320.6"/></svg>`;

let lwCalendar;
lwCalendar = function(events, options, date) {
    /*
        Members:
            this.options                    --> Array of objects: customizable options of the calendar
            this.events                     --> Array of objects: list of events to add into the calendar
            this.current                    --> Date: current date time
            this.current.month              --> Number: current month, from 0 to 11
            this.current.year               --> Absolute number: current year
            this.selected                   --> Date: selected date. Default current
            this.selected.month             --> Number: month of the selected date, from 0 to 11
            this.selected.year              --> Absolute number: year of the selected date
            this.selected.lastDayNumber     --> Number: last day of the selected month, from 1 to 31
            this.selected.firstDayWeekDay   --> Number: number of week's day of the first day of the month, from 0 (sunday) to 6 (saturday)
            this.selected.lastDayWeekDay    --> Number: number of week's day of the last day of the month, from 0 (sunday) to 6 (saturday)
            this.previous                   --> Date: previous month of the current one
            this.previous.lastDayNumber     --> Number: last day number of the previous month
     */

    // Default options
    this.options = {
        // Style options
        disabledDays: [],                       // Array of numbers: days of the week to be slightly transparent (days go from 0 to 6)
        // Header options
        headerContainer: '',                    // Element: container in which navigation is displayed
        showHeader: true,                       // Bool: show current date
        showNav: true,                          // Bool: show arrows for navigation
        // Events
        loadNewEvents: () => events,            // Function: return a new list of events to load
    };

    // Check for matches in properties and overwrites default values;
    // If a property is a String, the value is transformed to lower case
    for (let property in options){
        if (options.hasOwnProperty(property) && this.options.hasOwnProperty(property)) {
            this.options[property] = typeof options[property] === 'string' ? options[property].toLowerCase() : options[property];
        }
    }

    // Check if there are events passed as parameter, if so sets them
    events ? this.events = events : this.events = {};

    // Get current date time and set current month and year
    this.current = new Date();
    this.current.month = this.current.getMonth();
    this.current.year = this.current.getFullYear();

    // Set selected date time and selected month, year and day number of the last day of the month
    this.selected = this.current;
    if (date) {
        this.selected = date;
    }
    this.selected.month = this.selected.getMonth();
    this.selected.year = this.selected.getFullYear();
    this.selected.lastDayNumber = new Date(this.selected.year, (this.selected.month + 1), 0).getDate();

    // Week's day of the first day of the month
    this.selected.firstDayWeekDay = new Date(this.selected.year, (this.selected.month), 1).getDay();
    // Week goes from monday to sunday
    this.selected.firstDayWeekDay === 0 ? this.selected.firstDayWeekDay = 6 : this.selected.firstDayWeekDay--;
    // Week's day of the last day of the month
    this.selected.lastDayWeekDay = new Date(this.selected.year, (this.selected.month + 1), 0).getDay();
    // Week goes from monday to sunday
    this.selected.lastDayWeekDay === 0 ? this.selected.lastDayWeekDay = 6 : this.selected.lastDayWeekDay--;

    // Set previous month
    if (this.selected.month === 0) {
        this.previous = new Date(this.selected.year - 1, 11, 1);
    } else {
        this.previous = new Date(this.selected.year, (this.selected.month - 1), 1);
    }
    // Set previous month's last day number
    this.previous.lastDayNumber = new Date(this.previous.getFullYear(), (this.previous.getMonth() + 1), 0).getDate();
};

function createCalendar(calendar, element, adjuster) {
    if (typeof adjuster !== 'undefined') {
        let newDate = new Date(calendar.selected.year, calendar.selected.month + adjuster, 1);
        calendar = new lwCalendar(calendar.events, calendar.options, newDate);
        element.innerHTML = '';
    }

    // Create main container: cld-main
    let mainSection = document.createElement('div');
    mainSection.className += 'cld-main';

    function createCalendarHeader() {
        /*
            CSS classes:
                .cld-main       --> div: Main container
                .cld-datetime   --> div: Header container
                .cld-nav        --> div: Container for navigation arrow
                .cld-left       --> Left position for navigation container
                .today          --> div: Container for selected month and year in header
                .cld-right      --> Left position for navigation container
         */

        let calendarHeader = document.createElement('div');
        calendarHeader.className += 'cld-datetime';

        // Check if the option to show the navigation is set to true, if so print the left navigation menu
        if (calendar.options.showNav) {
            let leftArrowContainer = document.createElement('div');
            leftArrowContainer.className += 'cld-nav cld-left';

            // Add a listener to create a new calendar with adjuster on left navigation click
            leftArrowContainer.addEventListener('click', function() {
                if (typeof calendar.options.loadNewEvents === 'function') {
                    calendar.events = calendar.options.loadNewEvents();
                }
                createCalendar(calendar, element, -1);
            });

            // Add SVG code for left arrow
            leftArrowContainer.innerHTML = leftArrow;
            calendarHeader.appendChild(leftArrowContainer);
        }

        // Create header element for selected month and year
        let selectedMonthAndYear = document.createElement('div');
        selectedMonthAndYear.className += 'today';
        selectedMonthAndYear.innerHTML = months[calendar.selected.month] + ' ' + calendar.selected.year;
        calendarHeader.appendChild(selectedMonthAndYear);

        // Check if the option to show the navigation is set to true, if so print the right navigation menu
        if (calendar.options.showNav) {
            let rightArrowContainer = document.createElement('div');
            rightArrowContainer.className += 'cld-nav cld-right';

            // Add a listener to create a new calendar with adjuster on right navigation click
            rightArrowContainer.addEventListener('click', function() {
                if (typeof calendar.options.loadNewEvents === 'function') {
                    calendar.events = calendar.options.loadNewEvents();
                }
                createCalendar(calendar, element, 1);
            });

            rightArrowContainer.innerHTML = rightArrow;

            calendarHeader.appendChild(rightArrowContainer);
        }

        // If present a different header container puts the header in that, else it goes in the default location (<div class="cld-main">)
        if (calendar.options.headerContainer) {
            document.getElementById(calendar.options.headerContainer).innerHTML = '';
            document.getElementById(calendar.options.headerContainer).appendChild(calendarHeader);
        } else {
            mainSection.appendChild(calendarHeader);
        }
    }

    function addDaysNamesLabels() {
        /*
            CSS classes:
                .cld-labels     --> ul: Days container
                .cld-label      --> li: Single day
         */

        // Create container for label days
        let labels = document.createElement('ul');
        labels.className = 'cld-labels';

        // Add label days into labels container
        for (let i = 0; i < daysLabels.length; i++) {
            let label = document.createElement('li');
            label.className += 'cld-label';
            label.innerHTML = daysLabels[i];
            labels.appendChild(label);
        }

        mainSection.appendChild(labels);
    }

    function addDays() {
        /*
            CSS classes:
                .cld-days       --> ul: Days numbers container
                .cld-day        --> li: Single day container
                .prev-month     --> li: Style for days of the previous month
                .disabled-day   --> Disabled day
                .curr-month     --> li: Style for days of the current month
                .event-day      --> Event day
                .event-box      --> span: Container for events list
                .current-day    --> Today
                .next-month     --> li: Style for days of the next month
        */

        // Create number element
        function dayNumber(number) {
            /*
                CSS classes:
                    .cld-number --> p: Day number
             */

            let numberElement = document.createElement('p');
            numberElement.className += 'cld-number';
            numberElement.innerHTML += number;
            return numberElement;
        }

        // Create number element for months with inactive current date
        function checkInactiveCurrentDay(number) {
            /*
                CSS classes:
                    .cld-number         --> p: Day number
                    .not-current-today  --> Current day in non active days
             */

            // Get current date
            let dataInformation = new Date();
            let currentDay = dataInformation.getDate();

            let numberElement = document.createElement('p');

            if (number === currentDay) {
                numberElement.className += 'cld-number not-current-today';
            } else {
                numberElement.className += 'cld-number';
            }

            numberElement.innerHTML += number;
            return numberElement;
        }

        // Create days numbers container
        let days = document.createElement('ul');
        days.className += 'cld-days';

        // Previous month's days
        for (let i = 0; i < (calendar.selected.firstDayWeekDay); i++) {
            let day = document.createElement('li');
            day.className += 'cld-day prev-month';

            // Disabled days
            let d = i % 7;
            for (let q = 0; q < calendar.options.disabledDays.length; q++) {
                if (d === calendar.options.disabledDays[q]) {
                    day.className += ' disabled-day';
                }
            }

            let dataInformation = new Date();
            let currentMonth = dataInformation.getMonth();
            let number;

            if ((calendar.selected.month - 1) === currentMonth) {
                number = checkInactiveCurrentDay((calendar.previous.lastDayNumber - calendar.selected.firstDayWeekDay) + (i + 1));
            } else {
                number = dayNumber((calendar.previous.lastDayNumber - calendar.selected.firstDayWeekDay) + (i + 1));
            }

            day.appendChild(number);
            days.appendChild(day);
        }

        // Current month's days
        for (let i = 0; i < calendar.selected.lastDayNumber; i++) {
            let day = document.createElement('li');
            day.className += 'cld-day curr-month';

            //Disabled Days
            let d = (i + calendar.selected.firstDayWeekDay) % 7;
            for (let q = 0; q < calendar.options.disabledDays.length; q++){
                if (d === calendar.options.disabledDays[q]) {
                    day.className += ' disabled-day';
                }
            }

            let number = dayNumber(i + 1);
            // Check date and events date
            for (let eventsCounter = 0; eventsCounter < calendar.events.length; eventsCounter++) {
                // Current event date and current date
                let eventDate = calendar.events[eventsCounter].eventDate;
                let currentDate = new Date(calendar.selected.year, calendar.selected.month, (i + 1));

                // Check if event date is equal to current date
                if (eventDate.getTime() === currentDate.getTime()) {
                    number.className += ' event-day';

                    // Container for events list
                    let eventsContainer = document.createElement('span');
                    eventsContainer.className += 'event-box';

                    for (let eventsSameDay = 0; eventsSameDay < calendar.events[eventsCounter].title.length; eventsSameDay++) {
                        eventsContainer.innerHTML += `<a href="${calendar.events[eventsCounter].link[eventsSameDay]}">${calendar.events[eventsCounter].title[eventsSameDay]}</a>`;
                    }

                    number.appendChild(eventsContainer);
                }
            }

            day.appendChild(number);

            // Check if is current day
            if ((i + 1) === calendar.current.getDate() &&
                calendar.selected.month === calendar.current.month &&
                calendar.selected.year === calendar.current.year) {
                day.className += ' current-day';
            }

            days.appendChild(day);
        }

        // Next month's days, always same amount of days in calendar
        let extraDays = 13;
        if (days.children.length > 35) {
            extraDays = 6;
        } else if (days.children.length < 29) {
            extraDays = 20;
        }

        for (let i = 0; i < (extraDays - calendar.selected.lastDayWeekDay); i++) {
            let day = document.createElement('li');
            day.className += 'cld-day next-month';

            // Disabled days
            let d = (i + calendar.selected.lastDayWeekDay + 1) % 7;
            for (let q = 0; q < calendar.options.disabledDays.length; q++) {
                if (d === calendar.options.disabledDays[q]) {
                    day.className += ' disabled-day';
                }
            }

            let dataInformation = new Date();
            let currentMonth = dataInformation.getMonth();
            let number;

            if ((calendar.selected.month + 1) === currentMonth) {
                number = checkInactiveCurrentDay(i + 1);
            } else {
                number = dayNumber(i + 1);
            }

            day.appendChild(number);
            days.appendChild(day);
        }

        mainSection.appendChild(days);
    }

    element.appendChild(mainSection);

    if (calendar.options.showHeader) {
        createCalendarHeader();
    }

    addDaysNamesLabels();
    addDays();
}

function initLwCalendar (element, data, settings) {
    let obj = new lwCalendar(data, settings);
    createCalendar(obj, element);
}