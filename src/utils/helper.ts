let logCounter = 0;
export const logData = (message = '', data: any) => {
  logCounter += 1;
  const timestamp = new Date().toLocaleString();
  const logNumber = logCounter.toString().padStart(3, '0');

  console.log(`\n--- Log #${logNumber} ---`);
  console.log(`Time: ${timestamp}`);
  console.log(`Message: ${message}`);

  if (data) {
    console.log('payload: ', JSON.stringify(data, null, 2));
  }

  console.log('---------------------\n');
};
