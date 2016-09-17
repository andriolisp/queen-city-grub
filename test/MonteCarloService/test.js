var montecarloService = require('../../src/MontecarloService');

var result = montecarloService.Initialize();
console.log(result.GetSuggestion());
result.Reply(0)
if (result.GetResult()) {
  console.log('Final Suggestion: ' + result.GetFinalSuggestion());
} else {
  console.log(result.GetSuggestion());
  result.Reply(1);
  if (result.GetResult()) {
    console.log('Final Suggestion: ' + result.GetFinalSuggestion());
  } else {
    console.log(result.GetSuggestion());
    result.Reply(2);
    if (result.GetResult()) {
      console.log('Final Suggestion: ' + result.GetFinalSuggestion());
    } else {
      console.log(result.GetSuggestion());
      result.Reply(1);
      if (result.GetResult()) {
        console.log('Final Suggestion: ' + result.GetFinalSuggestion());
      } else {
        console.log(result.GetSuggestion());
        result.Reply(2);
        if (result.GetResult()) {
          console.log('Final Suggestion: ' + result.GetFinalSuggestion());
        } else {
          console.log(result.GetSuggestion());
          result.Reply(1);
          if (result.GetResult()) {
            console.log('Final Suggestion: ' + result.GetFinalSuggestion());
          } else {
            console.log(result.GetSuggestion());
            result.Reply(2);
          }
        }
      }
    }
  }
}