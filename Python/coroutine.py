from collections import namedtuple
import random

service_data = namedtuple("Service_data", "name receive time_total time_limit done")

def service_coroutine(name, payment, time_limit, sOvertime):
    """
    :param name: Name of employer
    :param payment: payment/hour
    :param time_limit: limit o time of work on a week
    :param sOvertime: O overtime the payment/hour
    :return: service_data
    """
    time_total = 0
    total_payment = 0
    while time_total < time_limit:
        data = service_data(name, total_payment, time_total, time_limit, False)
        time = yield data
        time_total += time
        if (time_total <= time_limit):
            total_payment += payment * time
        else:
            exceded = time_total - time_limit
            total_payment += (time - exceded) * payment + exceded * sOvertime
    data = service_data(name, total_payment, time_total, time_limit, True)
    yield data


class Simulator:
    def __init__(self, *routines):
        self.routines = list(routines)
        self.data = [next(routine_data) for routine_data in routines]
        self.events = [*self.data]
    def execute(self):
        clock = 0
        final_values = []
        last_clock = 1
        rest = {}
        while len(self.routines) > 0 or clock < last_clock:
            print(f"{clock}h")
            for index, data, routine in zip(range(len(self.data)), self.data, self.routines):
                hour = self.defineHour(data)
                if data.time_total <= clock:
                    try:
                        new_data = routine.send(hour)
                    except StopIteration:
                        final_values.append(data)
                        rest[data.time_total] = data
                        del self.data[index]
                        del self.routines[index]
                    else:
                        print(f"Service: {data}")
                        print(f"{hour}h; service until: {new_data.time_total}h")
                        self.data[index] = new_data
                        last_clock = data.time_total if data.time_total > last_clock else last_clock
                    if clock in rest:
                        print((f"Finished: {rest[clock]}"))
            clock += 1
        return final_values

    def defineHour(self, data):
        return random.randint(0, int((data.time_limit - data.time_total) + data.time_limit * 0.1))


kefflen = service_coroutine("Kefflen", 10, 48, 15)
ana = service_coroutine("Ana", 12, 35, 15)
pedro = service_coroutine("Pedro", 13, 40, 13)
simulator = Simulator(kefflen, ana, pedro)
data = simulator.execute()