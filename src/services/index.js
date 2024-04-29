const counters = []

module.exports = {
  store () {
    const counter = {
      status: 0,
      count: 0
    }

    if (!counters.length) {
      counter.id = 1
    } else {
      const lastCounter= counters.pop()
      counter.id = lastCounter.id + 1
    }

    // store new counter
    counters.push(counter)
    console.log('total counters stored:', counters)

    return counter
  }
}