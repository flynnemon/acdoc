# ACdoc

`ACdoc`, or Accountibility Document Block, is a simple tool designed to be tied to a git pre commit hook to automatically update some information about the files you have added to the git commit. `ACdoc` can also be ran in any git folder or sub-folder and manualy invoke the same results. This is all designed to give teams and organizations better accountibility over their code. By keeping some simple fields up to date in a docblock at the top of all your code files, you will gain an important view over every bit of work done.

the ACdoc docblock looks someting like this:
```
/*
* Created by: 			Ryan Flynn
* Created Date: 		Wed, 04 Apr 2018 03:49:43 GMT
* Date last edited:		Wed, 04 Apr 2018 04:25:12 GMT
* Edited last by:		Ryan Flynn
* Contributors: 		Ryan Flynn, Adam Link
*/
```
It would be best to tie this into your IDE or code generators to keep formatting consistant, but will have no issues filling in the data so long as the keys exist. `ACdoc` will find these keys and keep contributors, edited last by, and date last edited up to date.

Currently `ACdoc` only supports editing existing AC Blocks but will soon have the ability to write blocks to files as well.

### Install
```
npm install -g acdoc
```
```
yarn global add acdoc
```

