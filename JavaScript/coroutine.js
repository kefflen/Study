
//Salary and sOvertime R$/h; time:h
function* service(name, timeLimit, salary, sOverTime) {
    let time
    let total = 0, totalTime = 0
    while (totalTime < timeLimit) {
        time = yield {name, receive: total, totalTime, done: false, timeLimit}
        totalTime += time
        total += (totalTime < timeLimit)? time * salary : time*sOverTime
    }
    return {name, receive: total, totalTime, done:true, timeLimit}
}
let gen = service("Kefflen", 48, 7, 15)
let gen2 = service("Pedro", 30, 6, 11)
let gen3 = service("Ana", 40, 6, 12)
function coroutineSevices(...gens) {
    return {
        limits: gens.map(value => value.next().value),
        time: 0,
        services: gens,
        finisheds: [],
        execute() {
            while (this.services.length > 0) {
                for (let serv in this.services) {
                    let hour = Math.floor((Math.random() * this.limits[serv].timeLimit) + 0)
                    if (this.limits[serv].totalTime <= this.time) {
                        let res = this.services[serv].next(hour)
                        this.limits[serv] = res.value
                        if (!res.done) {
                            console.log(res)
                        } else {
                            console.log(res)
                            this.services.splice(serv, 1)
                            this.finisheds.push(res)
                            this.limits.splice(serv, 1)
                        }
                    }
                }
            this.time++
            console.log(this.time)
            }
        }
    }
}
let obj = coroutineSevices(gen, gen2, gen3)
obj.execute()
console.log(obj.finisheds)