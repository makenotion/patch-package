"use strict";
// tslint:disable
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("../patch/parse");
const patch = `diff --git a/banana.ts b/banana.ts
index 2de83dd..842652c 100644
--- a/banana.ts
+++ b/banana.ts
@@ -1,5 +1,5 @@
 this
 is
 
-a
+
 file
`;
const invalidHeaders1 = `diff --git a/banana.ts b/banana.ts
index 2de83dd..842652c 100644
--- a/banana.ts
+++ b/banana.ts
@@ -1,5 +1,4 @@
 this
 is
 
-a
+
 file
`;
const invalidHeaders2 = `diff --git a/banana.ts b/banana.ts
index 2de83dd..842652c 100644
--- a/banana.ts
+++ b/banana.ts
@@ -1,4 +1,5 @@
 this
 is
 
-a
+
 file
`;
const invalidHeaders3 = `diff --git a/banana.ts b/banana.ts
index 2de83dd..842652c 100644
--- a/banana.ts
+++ b/banana.ts
@@ -1,0 +1,5 @@
 this
 is
 
-a
+
 file
`;
const invalidHeaders4 = `diff --git a/banana.ts b/banana.ts
index 2de83dd..842652c 100644
--- a/banana.ts
+++ b/banana.ts
@@ -1,5 +1,0 @@
 this
 is
 
-a
+
 file
`;
const invalidHeaders5 = `diff --git a/banana.ts b/banana.ts
index 2de83dd..842652c 100644
--- a/banana.ts
+++ b/banana.ts
@@ -1,5 +1,5@@
 this
 is
 
-a
+
 file
`;
const accidentalBlankLine = `diff --git a/banana.ts b/banana.ts
index 2de83dd..842652c 100644
--- a/banana.ts
+++ b/banana.ts
@@ -1,5 +1,5 @@
 this
 is

-a
+
 file
`;
const crlfLineBreaks = `diff --git a/banana.ts b/banana.ts
new file mode 100644
index 0000000..3e1267f
--- /dev/null
+++ b/banana.ts
@@ -0,0 +1 @@
+this is a new file
`.replace(/\n/g, "\r\n");
const modeChangeAndModifyAndRename = `diff --git a/numbers.txt b/banana.txt
old mode 100644
new mode 100755
similarity index 96%
rename from numbers.txt
rename to banana.txt
index fbf1785..92d2c5f
--- a/numbers.txt
+++ b/banana.txt
@@ -1,4 +1,4 @@
-one
+ne
 
 two
 
`;
const oldStylePatch = `patch-package
--- a/node_modules/graphql/utilities/assertValidName.js
+++ b/node_modules/graphql/utilities/assertValidName.js
@@ -41,10 +41,11 @@ function assertValidName(name) {
  */
 function isValidNameError(name, node) {
   !(typeof name === 'string') ? (0, _invariant2.default)(0, 'Expected string') : void 0;
-  if (name.length > 1 && name[0] === '_' && name[1] === '_') {
-    return new _GraphQLError.GraphQLError('Name "' + name + '" must not begin with "__", which is reserved by ' + 'GraphQL introspection.', node);
-  }
+  // if (name.length > 1 && name[0] === '_' && name[1] === '_') {
+  //   return new _GraphQLError.GraphQLError('Name "' + name + '" must not begin with "__", which is reserved by ' + 'GraphQL introspection.', node);
+  // }
   if (!NAME_RX.test(name)) {
     return new _GraphQLError.GraphQLError('Names must match /^[_a-zA-Z][_a-zA-Z0-9]*$/ but "' + name + '" does not.', node);
   }
+
 }
\\ No newline at end of file
--- a/node_modules/graphql/utilities/assertValidName.mjs
+++ b/node_modules/graphql/utilities/assertValidName.mjs
@@ -29,9 +29,9 @@ export function assertValidName(name) {
  */
 export function isValidNameError(name, node) {
   !(typeof name === 'string') ? invariant(0, 'Expected string') : void 0;
-  if (name.length > 1 && name[0] === '_' && name[1] === '_') {
-    return new GraphQLError('Name "' + name + '" must not begin with "__", which is reserved by ' + 'GraphQL introspection.', node);
-  }
+  // if (name.length > 1 && name[0] === '_' && name[1] === '_') {
+  //   return new GraphQLError('Name "' + name + '" must not begin with "__", which is reserved by ' + 'GraphQL introspection.', node);
+  // }
   if (!NAME_RX.test(name)) {
     return new GraphQLError('Names must match /^[_a-zA-Z][_a-zA-Z0-9]*$/ but "' + name + '" does not.', node);
   }
`;
describe("the patch parser", () => {
    it("works for a simple case", () => {
        expect(parse_1.parsePatchFile(patch)).toMatchSnapshot();
    });
    it("fails when the patch file has invalid headers", () => {
        expect(() => parse_1.parsePatchFile(invalidHeaders1)).toThrow();
        expect(() => parse_1.parsePatchFile(invalidHeaders2)).toThrow();
        expect(() => parse_1.parsePatchFile(invalidHeaders3)).toThrow();
        expect(() => parse_1.parsePatchFile(invalidHeaders4)).toThrow();
        expect(() => parse_1.parsePatchFile(invalidHeaders5)).toThrow();
    });
    it("is OK when blank lines are accidentally created", () => {
        expect(parse_1.parsePatchFile(accidentalBlankLine)).toEqual(parse_1.parsePatchFile(patch));
    });
    it(`can handle files with CRLF line breaks`, () => {
        expect(parse_1.parsePatchFile(crlfLineBreaks)).toMatchSnapshot();
    });
    it("works", () => {
        expect(parse_1.parsePatchFile(modeChangeAndModifyAndRename)).toMatchSnapshot();
        expect(parse_1.parsePatchFile(accidentalBlankLine)).toMatchSnapshot();
        expect(parse_1.parsePatchFile(modeChangeAndModifyAndRename)).toMatchSnapshot();
    });
    it.only("parses old-style patches", () => {
        expect(parse_1.parsePatchFile(oldStylePatch)).toMatchSnapshot();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXRjaC9wYXJzZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQkFBaUI7O0FBRWpCLDBDQUErQztBQUUvQyxNQUFNLEtBQUssR0FBRzs7Ozs7Ozs7Ozs7Q0FXYixDQUFBO0FBQ0QsTUFBTSxlQUFlLEdBQUc7Ozs7Ozs7Ozs7O0NBV3ZCLENBQUE7QUFFRCxNQUFNLGVBQWUsR0FBRzs7Ozs7Ozs7Ozs7Q0FXdkIsQ0FBQTtBQUVELE1BQU0sZUFBZSxHQUFHOzs7Ozs7Ozs7OztDQVd2QixDQUFBO0FBQ0QsTUFBTSxlQUFlLEdBQUc7Ozs7Ozs7Ozs7O0NBV3ZCLENBQUE7QUFFRCxNQUFNLGVBQWUsR0FBRzs7Ozs7Ozs7Ozs7Q0FXdkIsQ0FBQTtBQUVELE1BQU0sbUJBQW1CLEdBQUc7Ozs7Ozs7Ozs7O0NBVzNCLENBQUE7QUFFRCxNQUFNLGNBQWMsR0FBRzs7Ozs7OztDQU90QixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFFeEIsTUFBTSw0QkFBNEIsR0FBRzs7Ozs7Ozs7Ozs7Ozs7O0NBZXBDLENBQUE7QUFFRCxNQUFNLGFBQWEsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWtDckIsQ0FBQTtBQUVELFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDaEMsRUFBRSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtRQUNqQyxNQUFNLENBQUMsc0JBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO0lBQ2pELENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtRQUN2RCxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3ZELE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDdkQsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLHNCQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUN2RCxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsc0JBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3ZELE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxzQkFBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDekQsQ0FBQyxDQUFDLENBQUE7SUFDRixFQUFFLENBQUMsaURBQWlELEVBQUUsR0FBRyxFQUFFO1FBQ3pELE1BQU0sQ0FBQyxzQkFBYyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQzVFLENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEdBQUcsRUFBRTtRQUNoRCxNQUFNLENBQUMsc0JBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO0lBQzFELENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7UUFDZixNQUFNLENBQUMsc0JBQWMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUE7UUFFdEUsTUFBTSxDQUFDLHNCQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFBO1FBQzdELE1BQU0sQ0FBQyxzQkFBYyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUN4RSxDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxFQUFFO1FBQ3ZDLE1BQU0sQ0FBQyxzQkFBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUE7SUFDekQsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlXG5cbmltcG9ydCB7IHBhcnNlUGF0Y2hGaWxlIH0gZnJvbSBcIi4uL3BhdGNoL3BhcnNlXCJcblxuY29uc3QgcGF0Y2ggPSBgZGlmZiAtLWdpdCBhL2JhbmFuYS50cyBiL2JhbmFuYS50c1xuaW5kZXggMmRlODNkZC4uODQyNjUyYyAxMDA2NDRcbi0tLSBhL2JhbmFuYS50c1xuKysrIGIvYmFuYW5hLnRzXG5AQCAtMSw1ICsxLDUgQEBcbiB0aGlzXG4gaXNcbiBcbi1hXG4rXG4gZmlsZVxuYFxuY29uc3QgaW52YWxpZEhlYWRlcnMxID0gYGRpZmYgLS1naXQgYS9iYW5hbmEudHMgYi9iYW5hbmEudHNcbmluZGV4IDJkZTgzZGQuLjg0MjY1MmMgMTAwNjQ0XG4tLS0gYS9iYW5hbmEudHNcbisrKyBiL2JhbmFuYS50c1xuQEAgLTEsNSArMSw0IEBAXG4gdGhpc1xuIGlzXG4gXG4tYVxuK1xuIGZpbGVcbmBcblxuY29uc3QgaW52YWxpZEhlYWRlcnMyID0gYGRpZmYgLS1naXQgYS9iYW5hbmEudHMgYi9iYW5hbmEudHNcbmluZGV4IDJkZTgzZGQuLjg0MjY1MmMgMTAwNjQ0XG4tLS0gYS9iYW5hbmEudHNcbisrKyBiL2JhbmFuYS50c1xuQEAgLTEsNCArMSw1IEBAXG4gdGhpc1xuIGlzXG4gXG4tYVxuK1xuIGZpbGVcbmBcblxuY29uc3QgaW52YWxpZEhlYWRlcnMzID0gYGRpZmYgLS1naXQgYS9iYW5hbmEudHMgYi9iYW5hbmEudHNcbmluZGV4IDJkZTgzZGQuLjg0MjY1MmMgMTAwNjQ0XG4tLS0gYS9iYW5hbmEudHNcbisrKyBiL2JhbmFuYS50c1xuQEAgLTEsMCArMSw1IEBAXG4gdGhpc1xuIGlzXG4gXG4tYVxuK1xuIGZpbGVcbmBcbmNvbnN0IGludmFsaWRIZWFkZXJzNCA9IGBkaWZmIC0tZ2l0IGEvYmFuYW5hLnRzIGIvYmFuYW5hLnRzXG5pbmRleCAyZGU4M2RkLi44NDI2NTJjIDEwMDY0NFxuLS0tIGEvYmFuYW5hLnRzXG4rKysgYi9iYW5hbmEudHNcbkBAIC0xLDUgKzEsMCBAQFxuIHRoaXNcbiBpc1xuIFxuLWFcbitcbiBmaWxlXG5gXG5cbmNvbnN0IGludmFsaWRIZWFkZXJzNSA9IGBkaWZmIC0tZ2l0IGEvYmFuYW5hLnRzIGIvYmFuYW5hLnRzXG5pbmRleCAyZGU4M2RkLi44NDI2NTJjIDEwMDY0NFxuLS0tIGEvYmFuYW5hLnRzXG4rKysgYi9iYW5hbmEudHNcbkBAIC0xLDUgKzEsNUBAXG4gdGhpc1xuIGlzXG4gXG4tYVxuK1xuIGZpbGVcbmBcblxuY29uc3QgYWNjaWRlbnRhbEJsYW5rTGluZSA9IGBkaWZmIC0tZ2l0IGEvYmFuYW5hLnRzIGIvYmFuYW5hLnRzXG5pbmRleCAyZGU4M2RkLi44NDI2NTJjIDEwMDY0NFxuLS0tIGEvYmFuYW5hLnRzXG4rKysgYi9iYW5hbmEudHNcbkBAIC0xLDUgKzEsNSBAQFxuIHRoaXNcbiBpc1xuXG4tYVxuK1xuIGZpbGVcbmBcblxuY29uc3QgY3JsZkxpbmVCcmVha3MgPSBgZGlmZiAtLWdpdCBhL2JhbmFuYS50cyBiL2JhbmFuYS50c1xubmV3IGZpbGUgbW9kZSAxMDA2NDRcbmluZGV4IDAwMDAwMDAuLjNlMTI2N2Zcbi0tLSAvZGV2L251bGxcbisrKyBiL2JhbmFuYS50c1xuQEAgLTAsMCArMSBAQFxuK3RoaXMgaXMgYSBuZXcgZmlsZVxuYC5yZXBsYWNlKC9cXG4vZywgXCJcXHJcXG5cIilcblxuY29uc3QgbW9kZUNoYW5nZUFuZE1vZGlmeUFuZFJlbmFtZSA9IGBkaWZmIC0tZ2l0IGEvbnVtYmVycy50eHQgYi9iYW5hbmEudHh0XG5vbGQgbW9kZSAxMDA2NDRcbm5ldyBtb2RlIDEwMDc1NVxuc2ltaWxhcml0eSBpbmRleCA5NiVcbnJlbmFtZSBmcm9tIG51bWJlcnMudHh0XG5yZW5hbWUgdG8gYmFuYW5hLnR4dFxuaW5kZXggZmJmMTc4NS4uOTJkMmM1ZlxuLS0tIGEvbnVtYmVycy50eHRcbisrKyBiL2JhbmFuYS50eHRcbkBAIC0xLDQgKzEsNCBAQFxuLW9uZVxuK25lXG4gXG4gdHdvXG4gXG5gXG5cbmNvbnN0IG9sZFN0eWxlUGF0Y2ggPSBgcGF0Y2gtcGFja2FnZVxuLS0tIGEvbm9kZV9tb2R1bGVzL2dyYXBocWwvdXRpbGl0aWVzL2Fzc2VydFZhbGlkTmFtZS5qc1xuKysrIGIvbm9kZV9tb2R1bGVzL2dyYXBocWwvdXRpbGl0aWVzL2Fzc2VydFZhbGlkTmFtZS5qc1xuQEAgLTQxLDEwICs0MSwxMSBAQCBmdW5jdGlvbiBhc3NlcnRWYWxpZE5hbWUobmFtZSkge1xuICAqL1xuIGZ1bmN0aW9uIGlzVmFsaWROYW1lRXJyb3IobmFtZSwgbm9kZSkge1xuICAgISh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpID8gKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKDAsICdFeHBlY3RlZCBzdHJpbmcnKSA6IHZvaWQgMDtcbi0gIGlmIChuYW1lLmxlbmd0aCA+IDEgJiYgbmFtZVswXSA9PT0gJ18nICYmIG5hbWVbMV0gPT09ICdfJykge1xuLSAgICByZXR1cm4gbmV3IF9HcmFwaFFMRXJyb3IuR3JhcGhRTEVycm9yKCdOYW1lIFwiJyArIG5hbWUgKyAnXCIgbXVzdCBub3QgYmVnaW4gd2l0aCBcIl9fXCIsIHdoaWNoIGlzIHJlc2VydmVkIGJ5ICcgKyAnR3JhcGhRTCBpbnRyb3NwZWN0aW9uLicsIG5vZGUpO1xuLSAgfVxuKyAgLy8gaWYgKG5hbWUubGVuZ3RoID4gMSAmJiBuYW1lWzBdID09PSAnXycgJiYgbmFtZVsxXSA9PT0gJ18nKSB7XG4rICAvLyAgIHJldHVybiBuZXcgX0dyYXBoUUxFcnJvci5HcmFwaFFMRXJyb3IoJ05hbWUgXCInICsgbmFtZSArICdcIiBtdXN0IG5vdCBiZWdpbiB3aXRoIFwiX19cIiwgd2hpY2ggaXMgcmVzZXJ2ZWQgYnkgJyArICdHcmFwaFFMIGludHJvc3BlY3Rpb24uJywgbm9kZSk7XG4rICAvLyB9XG4gICBpZiAoIU5BTUVfUlgudGVzdChuYW1lKSkge1xuICAgICByZXR1cm4gbmV3IF9HcmFwaFFMRXJyb3IuR3JhcGhRTEVycm9yKCdOYW1lcyBtdXN0IG1hdGNoIC9eW19hLXpBLVpdW19hLXpBLVowLTldKiQvIGJ1dCBcIicgKyBuYW1lICsgJ1wiIGRvZXMgbm90LicsIG5vZGUpO1xuICAgfVxuK1xuIH1cblxcXFwgTm8gbmV3bGluZSBhdCBlbmQgb2YgZmlsZVxuLS0tIGEvbm9kZV9tb2R1bGVzL2dyYXBocWwvdXRpbGl0aWVzL2Fzc2VydFZhbGlkTmFtZS5tanNcbisrKyBiL25vZGVfbW9kdWxlcy9ncmFwaHFsL3V0aWxpdGllcy9hc3NlcnRWYWxpZE5hbWUubWpzXG5AQCAtMjksOSArMjksOSBAQCBleHBvcnQgZnVuY3Rpb24gYXNzZXJ0VmFsaWROYW1lKG5hbWUpIHtcbiAgKi9cbiBleHBvcnQgZnVuY3Rpb24gaXNWYWxpZE5hbWVFcnJvcihuYW1lLCBub2RlKSB7XG4gICAhKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykgPyBpbnZhcmlhbnQoMCwgJ0V4cGVjdGVkIHN0cmluZycpIDogdm9pZCAwO1xuLSAgaWYgKG5hbWUubGVuZ3RoID4gMSAmJiBuYW1lWzBdID09PSAnXycgJiYgbmFtZVsxXSA9PT0gJ18nKSB7XG4tICAgIHJldHVybiBuZXcgR3JhcGhRTEVycm9yKCdOYW1lIFwiJyArIG5hbWUgKyAnXCIgbXVzdCBub3QgYmVnaW4gd2l0aCBcIl9fXCIsIHdoaWNoIGlzIHJlc2VydmVkIGJ5ICcgKyAnR3JhcGhRTCBpbnRyb3NwZWN0aW9uLicsIG5vZGUpO1xuLSAgfVxuKyAgLy8gaWYgKG5hbWUubGVuZ3RoID4gMSAmJiBuYW1lWzBdID09PSAnXycgJiYgbmFtZVsxXSA9PT0gJ18nKSB7XG4rICAvLyAgIHJldHVybiBuZXcgR3JhcGhRTEVycm9yKCdOYW1lIFwiJyArIG5hbWUgKyAnXCIgbXVzdCBub3QgYmVnaW4gd2l0aCBcIl9fXCIsIHdoaWNoIGlzIHJlc2VydmVkIGJ5ICcgKyAnR3JhcGhRTCBpbnRyb3NwZWN0aW9uLicsIG5vZGUpO1xuKyAgLy8gfVxuICAgaWYgKCFOQU1FX1JYLnRlc3QobmFtZSkpIHtcbiAgICAgcmV0dXJuIG5ldyBHcmFwaFFMRXJyb3IoJ05hbWVzIG11c3QgbWF0Y2ggL15bX2EtekEtWl1bX2EtekEtWjAtOV0qJC8gYnV0IFwiJyArIG5hbWUgKyAnXCIgZG9lcyBub3QuJywgbm9kZSk7XG4gICB9XG5gXG5cbmRlc2NyaWJlKFwidGhlIHBhdGNoIHBhcnNlclwiLCAoKSA9PiB7XG4gIGl0KFwid29ya3MgZm9yIGEgc2ltcGxlIGNhc2VcIiwgKCkgPT4ge1xuICAgIGV4cGVjdChwYXJzZVBhdGNoRmlsZShwYXRjaCkpLnRvTWF0Y2hTbmFwc2hvdCgpXG4gIH0pXG4gIGl0KFwiZmFpbHMgd2hlbiB0aGUgcGF0Y2ggZmlsZSBoYXMgaW52YWxpZCBoZWFkZXJzXCIsICgpID0+IHtcbiAgICBleHBlY3QoKCkgPT4gcGFyc2VQYXRjaEZpbGUoaW52YWxpZEhlYWRlcnMxKSkudG9UaHJvdygpXG4gICAgZXhwZWN0KCgpID0+IHBhcnNlUGF0Y2hGaWxlKGludmFsaWRIZWFkZXJzMikpLnRvVGhyb3coKVxuICAgIGV4cGVjdCgoKSA9PiBwYXJzZVBhdGNoRmlsZShpbnZhbGlkSGVhZGVyczMpKS50b1Rocm93KClcbiAgICBleHBlY3QoKCkgPT4gcGFyc2VQYXRjaEZpbGUoaW52YWxpZEhlYWRlcnM0KSkudG9UaHJvdygpXG4gICAgZXhwZWN0KCgpID0+IHBhcnNlUGF0Y2hGaWxlKGludmFsaWRIZWFkZXJzNSkpLnRvVGhyb3coKVxuICB9KVxuICBpdChcImlzIE9LIHdoZW4gYmxhbmsgbGluZXMgYXJlIGFjY2lkZW50YWxseSBjcmVhdGVkXCIsICgpID0+IHtcbiAgICBleHBlY3QocGFyc2VQYXRjaEZpbGUoYWNjaWRlbnRhbEJsYW5rTGluZSkpLnRvRXF1YWwocGFyc2VQYXRjaEZpbGUocGF0Y2gpKVxuICB9KVxuICBpdChgY2FuIGhhbmRsZSBmaWxlcyB3aXRoIENSTEYgbGluZSBicmVha3NgLCAoKSA9PiB7XG4gICAgZXhwZWN0KHBhcnNlUGF0Y2hGaWxlKGNybGZMaW5lQnJlYWtzKSkudG9NYXRjaFNuYXBzaG90KClcbiAgfSlcblxuICBpdChcIndvcmtzXCIsICgpID0+IHtcbiAgICBleHBlY3QocGFyc2VQYXRjaEZpbGUobW9kZUNoYW5nZUFuZE1vZGlmeUFuZFJlbmFtZSkpLnRvTWF0Y2hTbmFwc2hvdCgpXG5cbiAgICBleHBlY3QocGFyc2VQYXRjaEZpbGUoYWNjaWRlbnRhbEJsYW5rTGluZSkpLnRvTWF0Y2hTbmFwc2hvdCgpXG4gICAgZXhwZWN0KHBhcnNlUGF0Y2hGaWxlKG1vZGVDaGFuZ2VBbmRNb2RpZnlBbmRSZW5hbWUpKS50b01hdGNoU25hcHNob3QoKVxuICB9KVxuXG4gIGl0Lm9ubHkoXCJwYXJzZXMgb2xkLXN0eWxlIHBhdGNoZXNcIiwgKCkgPT4ge1xuICAgIGV4cGVjdChwYXJzZVBhdGNoRmlsZShvbGRTdHlsZVBhdGNoKSkudG9NYXRjaFNuYXBzaG90KClcbiAgfSlcbn0pXG4iXX0=