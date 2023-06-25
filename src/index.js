(function () {
  let timers = new Map();

  const getId = (cb, delay) => {
    if (timers.size) {
      const id = new Date().getTime() + timers.size;
      timers.set(id, {
        cb,
        delay
      });
      return id;
    } else {
      const id = new Date().getTime();
      timers.set(id, {
        cb,
        delay
      });
      return id;
    }
  };

  window.mySetTimeout = function (cb, delay) {
    console.log(timers, "called");
    const id = getId(cb, delay);
    const time = Date.now();

    function callMe() {
      if (timers.has(id)) {
        if (Date.now() >= time + delay) {
          cb();
        } else {
          requestIdleCallback(callMe);
        }
      } else return;
    }
    requestIdleCallback(callMe);
    return id;
  };

  window.myClearTimeout = function (id) {
    if (timers.has(id)) {
      timers.delete(id);
      console.log(timers);
    }
  };
})();

console.log("1");

const id = mySetTimeout(() => {
  console.log("2");
}, 5000);

mySetTimeout(() => {
  console.log("4");
  myClearTimeout(id);
}, 0);
console.log("3");
