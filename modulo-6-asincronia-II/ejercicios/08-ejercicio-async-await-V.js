/**
 * Implementa la función retry que repite una función asíncrona hasta que
 * esuelve o se acaba el límite de intentos.
 */

const wait = require("./02-ejercicio-promesas-II");

async function retry(func, numTimes) {
  const times = new Array(numTimes);
  for (const time of times) {
    try {
      await func();
    } catch (error) { retry(func, 1); }
  }
}

async function maybeFailingLogger() {
  const randomMillisecondsWait = Math.max(1, Math.ceil(Math.random() * 6));

  await wait(randomMillisecondsWait);

  const willFail = Math.random() > 0.5;

  if (willFail) throw new Error("Failed.");

  console.log("SPAM!");
}

retry(maybeFailingLogger, 3); // SPAM! SPAM! SPAM!
