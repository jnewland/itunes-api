var dice = require('clj-fuzzy').metrics.dice
var console = require('console')

exports.confidentMatch = function confidentMatch(words, matchWord) {
  scoreSort = function(x, y){ return y[1] - x[1]}

  var results = words.map(function(word){
   score = dice(word, matchWord)
   return [word, score]
  })

  results = results.sort(scoreSort)
  results.length = 2

  var firstMatchConfidence = results[0][1]
  var secondMatchConfidence = results[1][1]
  var confidenceDelta = firstMatchConfidence - secondMatchConfidence

  console.log(results)

  if (firstMatchConfidence >= 0.4 && confidenceDelta >= 0.1) {
    return results[0][0]
  } else {
    return false
  }
}
