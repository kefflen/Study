
class Subs:
    def __init__(self, pub, name, connetions=None):
        self.contacts = list(connetions) or []
        self.pub = pub
        self.name = name
    def send(self, message):
        self.pub.send(self.contacts, message)
    def update(self, message):
        print(f"{self.name} received the message: {message}")
    def __repr__(self):
        return f"Subs({self.pub}, {self.name})"


class Pub:
    def __init__(self):
        self.conections = {}
        self.key = 1
    def add_connection(self, conn):
        for conection in list(conn):
            self.conections[self.key] = conection
            print(f"Add: {self.key}: {conection}")
            self.key += 1
    def rem_connection(self, key):
        self.conections.pop(key)
    def send(self, targets, message):
        for target in targets:
            try:
                self.conections[target].update(message)
            except KeyError as e:
                print(f"error: {e}")


class Proxy(Subs):
    def __init__(self, pub, name, conections=None):
        self.state = False
        self.__dict__["data"] = {}
        super(Proxy, self).__init__(pub, name, conections)
        self.state = True

    def send(self, message):
        message = f"{self.name}: {message}"
        super().send(message)

    def __setattr__(self, key, value):
        message = f"set: {key} = {value}"
        if key == "state":
            self.__dict__["state"] = value
        else:
            self.data[key] = value
            # print(message)
            if self.state:
                self.send(message)

    def __getattr__(self, item):
        return self.data[item]


publish = Pub()
p1 = Subs(publish, "P1", [2, 3])
p2 = Subs(publish, "p2", [3])
p3 = Subs(publish, "p3", [1])
p = Proxy(publish, "Proxy", [1, 3])
publish.add_connection([p1, p2, p3, p])
p.x = 2
p.x = 3
print(p.x)
print(p.state)
