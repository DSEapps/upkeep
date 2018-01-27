var itemsArray = function () {
  return [
    {
      "item_name": "Auto",
      "item_life": "120",
      "complex": true,
      "tasks": [
        {
          "task_name": "Service checkup",
          "task_reminder_text": "It's time to get a 60,000 mile service checkup on your car.  You want everything to run in top shape, don't you?",
          "task_frequency": "24"
        },
        {
          "task_name": "State inspection",
          "task_reminder_text": "It's time to get your annual State Inspectiom for your car.  You can't hide forever!",
          "task_frequency": "12"
        },
        {
          "task_name": "Replace battery",
          "task_reminder_text": "It's been 3 years since you've replaced your car battery.  Time to replace it before you get stuck!",
          "task_frequency": "36"
        },
        {
          "task_name": "Replace tires",
          "task_reminder_text": "Your car tires are 4 years old, time to replace them.  Better safe then sorry!",
          "task_frequency": "48"
        }
      ]
    },
    {
      "item_name": "HVAC",
      "item_life": "180",
      "complex": true,
      "tasks": [
        {
          "task_name": "Clean ducts",
          "task_reminder_text": "",
          "task_frequency": "60"
        },
        {
          "task_name": "Recharge freon",
          "task_reminder_text": "",
          "task_frequency": "60"
        }
      ]
    },
    {
      "item_name": "Clothes dryer",
      "item_life": "120",
      "complex": true,
      "tasks": [
        {
          "task_name": "Clean ducts",
          "task_reminder_text": "",
          "task_frequency": "12"
        }
      ]
    },
    {
      "item_name": "Hot water heater",
      "item_life": "120",
      "complex": true,
      "tasks": [
        {
          "task_name": "Descale",
          "task_reminder_text": "",
          "task_frequency": "36"
        },
        {
          "task_name": "Check for leaks",
          "task_reminder_text": "",
          "task_frequency": "12"
        }
      ]
    },
    {
      "item_name": "Siding",
      "item_life": "120",
      "complex": false,
      "tasks": [
        {
          "task_name": "Power wash",
          "task_reminder_text": "",
          "task_frequency": "12"
        },
        {
          "task_name": "Paint",
          "task_reminder_text": "",
          "task_frequency": "72"
        }
      ]
    }
  ]
};

module.exports = itemsArray;