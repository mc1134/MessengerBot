/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's conversation system.

In this example, Botkit hears a keyword, then asks a question. Different paths
through the conversation are chosen based on the user's response.

*/

module.exports = function(controller) {
    // A function that tests if two strings are equal
    function isEqual(str1, str2){
      return str1 == str2;
    }
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

    // This block listens for the master string "meeting" and listens for a time "##:##"/"#:##"/"#"
    controller.hears(['meeting', 'meet'], 'message_received', function(bot, message) {
      // strs stores all the queries in an array
      var strs = message.text.split(" ");
      // shortEnough stores if there are too many queries to search through
      var shortEnough = (strs.length <= 10);
      // time stores the given time
      var time = 'Not a time';
      // numOfTImes stores the number of times detected
      var numOfTimes = 0;
      for(var i = 0; shortEnough && i < strs.length; i++){
        if(followsFormat(strs[i], '##:##')
          || followsFormat(strs[i], '#:##')
          || (!isNaN(parseInt(strs[i])) && parseInt(strs[i]) <= 12 && parseInt(strs[i]) >= 0)){
          if(numOfTimes == 0){
            time = strs[i];
          } else {
            console.log('Multiple times detected: ' + numOfTimes);
          }
          numOfTimes++;
          //break;
        } else console.log('Error: ' + strs[i] + ' is not a valid time');
      }
      console.log('Time: ' + time);
      
      // A function that checks if the string follows a given format.
      // # stands for any number, $ stands for letter, * stands for any character
      function followsFormat(str, formatStr){
        console.log('  Called followsFormat(' + str + ', ' + formatStr + ')');
        if(str.length == 0 || str.length != formatStr.length)
          return false;
        for(var i = 0; i < str.length; i++){
          console.log('  (' + formatStr.charAt(i) + ', ' + str.charAt(i) + '); '
                     + (formatStr.charAt(i) == '#' && !isNaN(parseInt(str.charAt(i))))
                     + (formatStr.charAt(i) == '$' && isLetter(str))
                     + isEqual(str.charAt(i), formatStr.charAt(i)));
          if((formatStr.charAt(i) == '#' && !isNaN(parseInt(str.charAt(i))))
            || (formatStr.charAt(i) == '$' && isLetter(str))
            || isEqual(str.charAt(i), formatStr.charAt(i))){}
          else
            return false;
        }
        return true;
      }
      
      // A function that tests if the given string is a letter
      function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
      }
      
      bot.startConversation(message, function(err, convo){
        if(!shortEnough){
          convo.say('Too many queries. Try shortening your request.');
          // returns outside
        } else if(isEqual(time, 'Not a time'))
          convo.say('Time not detected. I guess you\'ll just meet whenever...');
        else if(numOfTimes > 1){
          convo.say('There are multiple times detected. Please specify a time:');
          // listens for a time
        } else {
          convo.say('So you want to meet at ' + time + '?');
          // does something else
        }
        convo.next();
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

    controller.hears(['question'], 'message_received', function(bot, message) {
      bot.createConversation(message, function(err, convo) {
        // create a path for when a user says YES
        convo.addMessage({
                text: 'How wonderful.',
        },'yes_thread');

        // create a path for when a user says NO
        // mark the conversation as unsuccessful at the end
        convo.addMessage({
            text: 'Cheese nips! It is not for everyone.',
            action: 'stop', // this marks the converation as unsuccessful
        },'no_thread');

        // create a path where neither option was matched
        // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
        convo.addMessage({
            text: 'Sorry I did not understand. Say `yes` or `no`',
            action: 'default',
        },'bad_response');

        // Create a yes/no question in the default thread...
        convo.ask('Do you like cheese nips?', [
          {
            pattern:  bot.utterances.yes,
            callback: function(response, convo) {
              convo.gotoThread('yes_thread');
            },
          },
          {
            pattern:  bot.utterances.no,
            callback: function(response, convo) {
              convo.gotoThread('no_thread');
            },
          },
          {
            default: true,
            callback: function(response, convo) {
              convo.gotoThread('bad_response');
            },
          }
        ]);

        convo.activate();

        // capture the results of the conversation and see what happened...
        convo.on('end', function(convo) {
          if (convo.successful()) {
            // this still works to send individual replies...
            bot.reply(message, 'Let us eat some!');

            // and now deliver cheese via tcp/ip...
          }
        });
      });
    });

};
