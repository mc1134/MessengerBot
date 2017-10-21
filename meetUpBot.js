    // NOTE: THIS BLOCK OF CODE HAS BEEN MODIFIED AND SERVES AS A TEMPLATE FOR ALL
    // BOT RESPONSES TO USER INPUT
    // This block listens for the string "color"
    controller.hears(['color'], 'message_received', function(bot, message) {
        bot.startConversation(message, function(err, convo) {
          // This line was part of the starter code.
          //convo.say('This is an example of using convo.ask with a single callback.');

          // Asks the user what his/her favorite color is upon hearing
          // the word "color" in the input string
          convo.ask('What is your favorite color?', function(response, convo) {
            // A function that tests if two strings are equal. May want to make this
            // accessible to other parts of the code.
            function testEquals(str1, str2){
              return str1 == str2;
            }

            var badColor = 'red';
            var responseColor = response.text;

            //console.log(response.text);
            //console.log('red' == 'red');
            //console.log('red' == 'blue');

            if(testEquals(responseColor, badColor))
              convo.say('Personally I think ' + badColor + ' is not the best color.');
            else 
              convo.say('Cool, I like ' + responseColor + ' too!');

            //console.log('Reached this point');

            convo.next();
            });
        });
    });

    // This block listens for the string "meetup"
    controller.hears(['meetup'], 'message_received', function(bot, message) {
        bot.startConversation(message, function(err, convo) {
          // Asks the user what setting
          convo.ask('Ok! Are you meeting up in a formal or informal context?', function(response, convo) {
            // A function that tests if two strings are equal
            function testEquals(str1, str2){
              return str1 == str2;
            }

            // Variables for formal/informal settings
            var fml = 'formal';
            var inf = 'informal';

            if(!(testEquals(response.text, fml) || testEquals(response.text, inf)))
              convo.say('Error: invalid setting. Exiting...');
            else {
              if(testEquals(response.text, fml)) 
                convo.say('Formal setting selected.');
              else
                convo.say('What\'s up my dude?');
              convo.say('Sending you to setting selection...');
              // Future implementation of setting selection
              // For now it will print stuff in the console
              console.log('Successfully selected setting.');
            }

            convo.next();
            });
        });
    });

    // This block listens for the string "jacob"
    controller.hears(['jacob'], 'message_received', function(bot, message) {
        bot.startConversation(message, function(err, convo) {
          // Asks the user what setting
          convo.ask('Sorry, did you mean: \"jekub\"?', function(response, convo) {
            // A function that tests if two strings are equal
            function testEquals(str1, str2){
              return str1 == str2;
            }

            var jacob = response.text;

            if(testEquals(jacob, 'yes'))
              convo.say('You are correct.');
            else
              convo.say('Whatever you say, jekub.');

            convo.next();
            });
        });
    });