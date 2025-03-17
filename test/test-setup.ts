import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  //We set up this global beforeEach here because we don't want to set this statement in every single e2e test file.
  //We remove test.sqlite after every e2e test cases since we use the same data to test. 
  //To make the next test runable we need to move the file.


  //Use try because first e2e test running does not have test.sqlite file which cause error throwing.
  try {
    //__dirname is going tobe /test folder
    // '..' means go back one folder which is the project folder
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (er) {}
});
