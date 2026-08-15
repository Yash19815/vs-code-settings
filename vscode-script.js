/* ============================================================
   VS CODE CUSTOM SCRIPT
   ------------------------------------------------------------
   [1] Command palette backdrop blur   (original)
   [2] Dynamic watermark icon          (config below)
   ============================================================ */


/* ============================================================
   [1] COMMAND PALETTE BLUR — original, unchanged
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
  const checkElement = setInterval(() => {
    const commandDialog = document.querySelector(".quick-input-widget");
    if (commandDialog) {
      // Apply the blur effect immediately if the command dialog is visible
      if (commandDialog.style.display !== "none") {
        runMyScript();
      }
      // Create an DOM observer to 'listen' for changes in element's attribute.
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            if (commandDialog.style.display === 'none') {
              handleEscape();
            } else {
              // If the .quick-input-widget element (command palette) is in the DOM
              // but no inline style display: none, show the backdrop blur.
              runMyScript();
            }
          }
        });
      });

      observer.observe(commandDialog, { attributes: true });

      // Clear the interval once the observer is set
      clearInterval(checkElement);
    } else {
      console.log("Command dialog not found yet. Retrying...");
    }
  }, 500); // Check every 500ms

  // Execute when command palette was launched.
  document.addEventListener('keydown', function(event) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'p') {
      event.preventDefault();
      runMyScript();
    } else if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      handleEscape();
    }
  });

  // Ensure the escape key event listener is at the document level
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      handleEscape();
    }
  }, true);

  function runMyScript() {
    const targetDiv = document.querySelector(".monaco-workbench");

    // Remove existing element if it already exists
    const existingElement = document.getElementById("command-blur");
    existingElement && existingElement.remove();

    // Create and configure the new element
    const newElement = document.createElement("div");
    newElement.setAttribute('id', 'command-blur');

    newElement.addEventListener('click', function() {
      newElement.remove();
    });

    // Append the new element as a child of the targetDiv
    targetDiv.appendChild(newElement);

    // Hide the sticky widget
    const widgets = document.querySelectorAll(".sticky-widget");
    widgets.forEach((widget) => {
      widget.style.opacity = 0;
    });

    // Hide the tree sticky widget
    const treeWidget = document.querySelector(".monaco-tree-sticky-container");
    treeWidget && (treeWidget.style.opacity = 0);
  }

  // Remove the backdrop blur from the DOM when esc key is pressed.
  function handleEscape() {
    const element = document.getElementById("command-blur");
    element && element.click();

    // Show the sticky widget
    const widgets = document.querySelectorAll(".sticky-widget");
    widgets.forEach((widget) => {
      widget.style.opacity = 1;
    });

    // Show the tree sticky widget
    const treeWidget = document.querySelector(".monaco-tree-sticky-container");
    treeWidget && (treeWidget.style.opacity = 1);
  }
});


/* ============================================================
   [2] DYNAMIC WATERMARK ICON
   ------------------------------------------------------------
   WHAT IT DOES
   ------------
   The empty-editor watermark shows the icon of the LAST
   language you edited:
     edit a Python file -> close all editors -> Python logo
     edit an HTML file  -> close all editors -> HTML logo

   HOW TO ADD YOUR OWN SVG ICONS
   -----------------------------
   1. Open your .svg in a text editor and copy its markup.
   2. Convert it to a data URI with any "SVG to data URI" tool
      (e.g. https://yoksel.github.io/url-encoder/).
      The result starts with:   data:image/svg+xml,%3Csvg ...
   3. In the LANGUAGE_ICONS map below, replace DEFAULT_ICON on
      the matching language line with your data URI string.
      Keep it wrapped in "double quotes" and keep the comma.

      Example:
        "python": "data:image/svg+xml,%3Csvg ...your svg... %3E",

   NOTES
   -----
   - The KEY must be VS Code's language id (all lowercase).
     Common ids: python, javascript, typescript, html, css,
     json, javascriptreact (JSX), typescriptreact (TSX),
     cpp, c, java, sql, markdown, xml, yaml, go, rust, php.
     Full list: https://code.visualstudio.com/docs/languages/identifiers
   - Any language not listed falls back to "default".
   - Use data URIs. file:/// paths may be blocked by VS Code's
     content security policy.
   - Icon SIZE is controlled in vscode-css.css, section 7.
   ============================================================ */

/* Generic </> icon — fallback + placeholder until you paste
   your own data URIs below. */
const DEFAULT_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235D6E7A' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M8 5l-7 7 7 7'/%3E%3Cpath d='M16 5l7 7-7 7'/%3E%3C/svg%3E";
const LANGUAGE_ICONS = {
  "default":         DEFAULT_ICON,
  "python":          "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='800px' height='800px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Epython %5B%23127%5D%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Dribbble-Light-Preview' transform='translate(-340.000000, -7599.000000)' fill='%23000000'%3E%3Cg id='icons' transform='translate(56.000000, 160.000000)'%3E%3Cpath d='M296.744,7457.45798 C296.262,7457.45798 295.872,7457.06594 295.872,7456.58142 C295.872,7456.0969 296.262,7455.70587 296.744,7455.70587 C297.226,7455.70587 297.616,7456.0969 297.616,7456.58142 C297.616,7457.06594 297.226,7457.45798 296.744,7457.45798 M294.072,7459 C299.15,7459 298.833,7456.78649 298.833,7456.78649 L298.827,7454.49357 L293.982,7454.49357 L293.982,7453.80499 L300.751,7453.80499 C300.751,7453.80499 304,7454.17591 304,7449.02614 C304,7443.87636 301.165,7444.0583 301.165,7444.0583 L299.472,7444.0583 L299.472,7446.44873 C299.472,7446.44873 299.563,7449.29855 296.682,7449.29855 L291.876,7449.29855 C291.876,7449.29855 289.176,7449.25533 289.176,7451.9222 L289.176,7456.33112 C289.176,7456.33112 288.766,7459 294.072,7459 M291.257,7440.54202 C291.739,7440.54202 292.128,7440.93406 292.128,7441.41858 C292.128,7441.9031 291.739,7442.29413 291.257,7442.29413 C290.775,7442.29413 290.385,7441.9031 290.385,7441.41858 C290.385,7440.93406 290.775,7440.54202 291.257,7440.54202 M293.928,7439 C288.851,7439 289.168,7441.21351 289.168,7441.21351 L289.174,7443.50643 L294.019,7443.50643 L294.019,7444.19501 L287.249,7444.19501 C287.249,7444.19501 284,7443.82409 284,7448.97386 C284,7454.12364 286.836,7453.9417 286.836,7453.9417 L288.528,7453.9417 L288.528,7451.55127 C288.528,7451.55127 288.437,7448.70145 291.319,7448.70145 L296.124,7448.70145 C296.124,7448.70145 298.824,7448.74467 298.824,7446.0778 L298.824,7441.66888 C298.824,7441.66888 299.234,7439 293.928,7439' id='python-%5B%23127%5D'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E", /* <<< REPLACE with your Python SVG data URI */
  "javascript":      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='800px' height='800px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Ejavascript %5B%23155%5D%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Dribbble-Light-Preview' transform='translate(-420.000000, -7479.000000)' fill='%23000000'%3E%3Cg id='icons' transform='translate(56.000000, 160.000000)'%3E%3Cpath d='M379.328,7337.432 C377.583,7337.432 376.455,7336.6 375.905,7335.512 L375.905,7335.512 L377.435,7334.626 C377.838,7335.284 378.361,7335.767 379.288,7335.767 C380.066,7335.767 380.563,7335.378 380.563,7334.841 C380.563,7334.033 379.485,7333.717 378.724,7333.391 C377.368,7332.814 376.468,7332.089 376.468,7330.558 C376.468,7329.149 377.542,7328.075 379.221,7328.075 C380.415,7328.075 381.275,7328.491 381.892,7329.578 L380.429,7330.518 C380.107,7329.941 379.758,7329.713 379.221,7329.713 C378.67,7329.713 378.321,7330.062 378.321,7330.518 C378.321,7331.082 378.67,7331.31 379.476,7331.659 C381.165,7332.383 382.443,7332.952 382.443,7334.814 C382.443,7336.506 381.114,7337.432 379.328,7337.432 L379.328,7337.432 Z M375,7334.599 C375,7336.546 373.801,7337.575 372.136,7337.575 C370.632,7337.575 369.731,7337 369.288,7336 L369.273,7336 L369.266,7336 L369.262,7336 L370.791,7334.931 C371.086,7335.454 371.352,7335.825 371.996,7335.825 C372.614,7335.825 373,7335.512 373,7334.573 L373,7328 L375,7328 L375,7334.599 Z M364,7339 L384,7339 L384,7319 L364,7319 L364,7339 Z' id='javascript-%5B%23155%5D'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E", /* <<< REPLACE with your JavaScript SVG data URI */
  "typescript":      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='800px' height='800px' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='nonzero' clip-rule='nonzero' d='M0 1.75C0 0.783501 0.783502 0 1.75 0H14.25C15.2165 0 16 0.783502 16 1.75V3.75C16 4.16421 15.6642 4.5 15.25 4.5C14.8358 4.5 14.5 4.16421 14.5 3.75V1.75C14.5 1.61193 14.3881 1.5 14.25 1.5H1.75C1.61193 1.5 1.5 1.61193 1.5 1.75V14.25C1.5 14.3881 1.61193 14.5 1.75 14.5H15.25C15.6642 14.5 16 14.8358 16 15.25C16 15.6642 15.6642 16 15.25 16H1.75C0.783501 16 0 15.2165 0 14.25V1.75ZM4.75 6.5C4.75 6.08579 5.08579 5.75 5.5 5.75H9.25C9.66421 5.75 10 6.08579 10 6.5C10 6.91421 9.66421 7.25 9.25 7.25H8.25V12.5C8.25 12.9142 7.91421 13.25 7.5 13.25C7.08579 13.25 6.75 12.9142 6.75 12.5V7.25H5.5C5.08579 7.25 4.75 6.91421 4.75 6.5ZM11.2757 6.58011C11.6944 6.08164 12.3507 5.75 13.25 5.75C14.0849 5.75 14.7148 6.03567 15.1394 6.48481C15.4239 6.78583 15.4105 7.26052 15.1095 7.54505C14.8085 7.82958 14.3338 7.81621 14.0493 7.51519C13.9394 7.39898 13.7204 7.25 13.25 7.25C12.7493 7.25 12.5306 7.41836 12.4243 7.54489C12.2934 7.70065 12.25 7.896 12.25 8C12.25 8.104 12.2934 8.29935 12.4243 8.45511C12.5306 8.58164 12.7493 8.75 13.25 8.75C13.3257 8.75 13.3988 8.76121 13.4676 8.78207C14.1307 8.87646 14.6319 9.17251 14.9743 9.58011C15.3684 10.0493 15.5 10.604 15.5 11C15.5 11.396 15.3684 11.9507 14.9743 12.4199C14.5556 12.9184 13.8993 13.25 13 13.25C12.1651 13.25 11.5352 12.9643 11.1106 12.5152C10.8261 12.2142 10.8395 11.7395 11.1405 11.4549C11.4415 11.1704 11.9162 11.1838 12.2007 11.4848C12.3106 11.601 12.5296 11.75 13 11.75C13.5007 11.75 13.7194 11.5816 13.8257 11.4551C13.9566 11.2993 14 11.104 14 11C14 10.896 13.9566 10.7007 13.8257 10.5449C13.7194 10.4184 13.5007 10.25 13 10.25C12.9243 10.25 12.8512 10.2388 12.7824 10.2179C12.1193 10.1235 11.6181 9.82749 11.2757 9.41989C10.8816 8.95065 10.75 8.396 10.75 8C10.75 7.604 10.8816 7.04935 11.2757 6.58011Z' fill='%23000000'/%3E%3C/svg%3E", /* <<< REPLACE with your TypeScript SVG data URI */
  "javascriptreact": "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='800px' height='800px' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='nonzero' clip-rule='nonzero' d='M4.84989 2.37195C4.59895 2.51683 4.33488 2.91636 4.30424 3.78785C4.28968 4.20181 3.9423 4.52559 3.52835 4.51103C3.11439 4.49647 2.79061 4.1491 2.80516 3.73514C2.84273 2.66673 3.1806 1.60366 4.09989 1.07291C5.02179 0.540653 6.11484 0.782356 7.06128 1.28727C7.42674 1.48224 7.56495 1.93656 7.36998 2.30201C7.17501 2.66747 6.72069 2.80568 6.35524 2.61072C5.5818 2.1981 5.10158 2.22663 4.84989 2.37195ZM8.87139 3.67284C9.19036 3.40858 9.66315 3.45293 9.92741 3.7719C10.4818 4.44103 11.0136 5.20405 11.4963 6.04018C12.5366 7.84191 13.178 9.68785 13.3509 11.2362C13.4372 12.0091 13.4108 12.7446 13.2303 13.3754C13.0484 14.011 12.6941 14.5863 12.0999 14.9293C11.381 15.3444 10.5509 15.2855 9.79114 15.0089C9.02868 14.7313 8.24395 14.2056 7.49586 13.5228C7.18993 13.2435 7.16831 12.7691 7.44756 12.4632C7.72681 12.1573 8.20119 12.1356 8.50712 12.4149C9.16624 13.0165 9.78567 13.4105 10.3043 13.5994C10.8257 13.7892 11.1537 13.7436 11.3499 13.6303C11.5143 13.5354 11.6797 13.342 11.7882 12.9627C11.8981 12.5787 11.9328 12.0529 11.8602 11.4026C11.7152 10.1045 11.1591 8.45607 10.1973 6.79018C9.75492 6.02396 9.27081 5.33055 8.77232 4.72886C8.50807 4.40989 8.55242 3.93709 8.87139 3.67284Z' fill='%23000000'/%3E%3Cpath fill-rule='nonzero' clip-rule='nonzero' d='M14.5 8.20557C14.5 7.91581 14.286 7.48735 13.5466 7.02507C13.1954 6.80549 13.0887 6.34276 13.3083 5.99154C13.5279 5.64032 13.9906 5.53361 14.3418 5.75319C15.2483 6.31993 16 7.14407 16 8.20557C16 9.27009 15.2442 10.0958 14.3337 10.663C13.9821 10.882 13.5195 10.7746 13.3005 10.423C13.0815 10.0714 13.189 9.60887 13.5405 9.38985C14.2846 8.92635 14.5 8.4962 14.5 8.20557ZM11.3626 11.0378C11.432 11.4462 11.1572 11.8335 10.7488 11.9029C9.89219 12.0484 8.96547 12.1274 8 12.1274C5.91954 12.1274 4.00018 11.76 2.57286 11.1355C1.86032 10.8238 1.23659 10.4332 0.780529 9.9615C0.320977 9.48616 0 8.89166 0 8.20557C0 7.37549 0.466082 6.68599 1.08548 6.16636C1.70712 5.64485 2.55471 5.22808 3.52013 4.92164C3.91494 4.79633 4.33657 5.01479 4.46189 5.40959C4.5872 5.80439 4.36874 6.22603 3.97394 6.35135C3.12334 6.62134 2.4724 6.96078 2.04954 7.31553C1.62442 7.67217 1.5 7.97899 1.5 8.20557C1.5 8.39536 1.58476 8.6353 1.85895 8.91891C2.13663 9.20613 2.57464 9.49905 3.17409 9.76131C4.37076 10.2848 6.07639 10.6274 8 10.6274C8.88475 10.6274 9.72732 10.5549 10.4976 10.424C10.906 10.3547 11.2933 10.6295 11.3626 11.0378Z' fill='%23000000'/%3E%3Cpath fill-rule='nonzero' clip-rule='nonzero' d='M4.87192 13.6303C5.12286 13.7752 5.6009 13.8041 6.37095 13.3949C6.73673 13.2005 7.19082 13.3395 7.38519 13.7052C7.57957 14.071 7.44062 14.5251 7.07484 14.7195C6.13079 15.2211 5.04121 15.4601 4.12192 14.9293C3.20003 14.3971 2.86282 13.3296 2.82687 12.2575C2.81299 11.8435 3.13733 11.4967 3.55131 11.4828C3.96529 11.4689 4.31215 11.7932 4.32603 12.2072C4.35541 13.0834 4.62023 13.485 4.87192 13.6303ZM3.98778 9.49712C3.59944 9.35301 3.40145 8.92138 3.54556 8.53304C3.84786 7.71839 4.24274 6.8763 4.72548 6.04018C5.76571 4.23845 7.04361 2.75996 8.29806 1.83609C8.92431 1.37487 9.57441 1.02999 10.211 0.870901C10.8524 0.71059 11.5278 0.729863 12.1219 1.07291C12.8408 1.48795 13.2049 2.23634 13.3452 3.03257C13.486 3.83168 13.4232 4.77409 13.2058 5.7634C13.1169 6.16796 12.7169 6.42388 12.3124 6.33501C11.9078 6.24613 11.6519 5.84612 11.7408 5.44155C11.9322 4.56992 11.9637 3.83647 11.868 3.29288C11.7717 2.7464 11.5681 2.48524 11.3719 2.37195C11.2076 2.27705 10.9574 2.23049 10.5747 2.32614C10.1871 2.42301 9.71442 2.65588 9.18757 3.04388C8.13584 3.81846 6.98632 5.12428 6.02452 6.79018C5.58214 7.55639 5.22369 8.32235 4.95185 9.0549C4.80774 9.44323 4.37611 9.64122 3.98778 9.49712Z' fill='%23000000'/%3E%3Cpath d='M9.45925 8.06618C9.45925 8.81694 8.85063 9.42556 8.09987 9.42556C7.34911 9.42556 6.7405 8.81694 6.7405 8.06618C6.7405 7.31542 7.34911 6.70681 8.09987 6.70681C8.85063 6.70681 9.45925 7.31542 9.45925 8.06618Z' fill='%23000000'/%3E%3C/svg%3E",
  "typescriptreact": "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='800px' height='800px' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='nonzero' clip-rule='nonzero' d='M4.84989 2.37195C4.59895 2.51683 4.33488 2.91636 4.30424 3.78785C4.28968 4.20181 3.9423 4.52559 3.52835 4.51103C3.11439 4.49647 2.79061 4.1491 2.80516 3.73514C2.84273 2.66673 3.1806 1.60366 4.09989 1.07291C5.02179 0.540653 6.11484 0.782356 7.06128 1.28727C7.42674 1.48224 7.56495 1.93656 7.36998 2.30201C7.17501 2.66747 6.72069 2.80568 6.35524 2.61072C5.5818 2.1981 5.10158 2.22663 4.84989 2.37195ZM8.87139 3.67284C9.19036 3.40858 9.66315 3.45293 9.92741 3.7719C10.4818 4.44103 11.0136 5.20405 11.4963 6.04018C12.5366 7.84191 13.178 9.68785 13.3509 11.2362C13.4372 12.0091 13.4108 12.7446 13.2303 13.3754C13.0484 14.011 12.6941 14.5863 12.0999 14.9293C11.381 15.3444 10.5509 15.2855 9.79114 15.0089C9.02868 14.7313 8.24395 14.2056 7.49586 13.5228C7.18993 13.2435 7.16831 12.7691 7.44756 12.4632C7.72681 12.1573 8.20119 12.1356 8.50712 12.4149C9.16624 13.0165 9.78567 13.4105 10.3043 13.5994C10.8257 13.7892 11.1537 13.7436 11.3499 13.6303C11.5143 13.5354 11.6797 13.342 11.7882 12.9627C11.8981 12.5787 11.9328 12.0529 11.8602 11.4026C11.7152 10.1045 11.1591 8.45607 10.1973 6.79018C9.75492 6.02396 9.27081 5.33055 8.77232 4.72886C8.50807 4.40989 8.55242 3.93709 8.87139 3.67284Z' fill='%23000000'/%3E%3Cpath fill-rule='nonzero' clip-rule='nonzero' d='M14.5 8.20557C14.5 7.91581 14.286 7.48735 13.5466 7.02507C13.1954 6.80549 13.0887 6.34276 13.3083 5.99154C13.5279 5.64032 13.9906 5.53361 14.3418 5.75319C15.2483 6.31993 16 7.14407 16 8.20557C16 9.27009 15.2442 10.0958 14.3337 10.663C13.9821 10.882 13.5195 10.7746 13.3005 10.423C13.0815 10.0714 13.189 9.60887 13.5405 9.38985C14.2846 8.92635 14.5 8.4962 14.5 8.20557ZM11.3626 11.0378C11.432 11.4462 11.1572 11.8335 10.7488 11.9029C9.89219 12.0484 8.96547 12.1274 8 12.1274C5.91954 12.1274 4.00018 11.76 2.57286 11.1355C1.86032 10.8238 1.23659 10.4332 0.780529 9.9615C0.320977 9.48616 0 8.89166 0 8.20557C0 7.37549 0.466082 6.68599 1.08548 6.16636C1.70712 5.64485 2.55471 5.22808 3.52013 4.92164C3.91494 4.79633 4.33657 5.01479 4.46189 5.40959C4.5872 5.80439 4.36874 6.22603 3.97394 6.35135C3.12334 6.62134 2.4724 6.96078 2.04954 7.31553C1.62442 7.67217 1.5 7.97899 1.5 8.20557C1.5 8.39536 1.58476 8.6353 1.85895 8.91891C2.13663 9.20613 2.57464 9.49905 3.17409 9.76131C4.37076 10.2848 6.07639 10.6274 8 10.6274C8.88475 10.6274 9.72732 10.5549 10.4976 10.424C10.906 10.3547 11.2933 10.6295 11.3626 11.0378Z' fill='%23000000'/%3E%3Cpath fill-rule='nonzero' clip-rule='nonzero' d='M4.87192 13.6303C5.12286 13.7752 5.6009 13.8041 6.37095 13.3949C6.73673 13.2005 7.19082 13.3395 7.38519 13.7052C7.57957 14.071 7.44062 14.5251 7.07484 14.7195C6.13079 15.2211 5.04121 15.4601 4.12192 14.9293C3.20003 14.3971 2.86282 13.3296 2.82687 12.2575C2.81299 11.8435 3.13733 11.4967 3.55131 11.4828C3.96529 11.4689 4.31215 11.7932 4.32603 12.2072C4.35541 13.0834 4.62023 13.485 4.87192 13.6303ZM3.98778 9.49712C3.59944 9.35301 3.40145 8.92138 3.54556 8.53304C3.84786 7.71839 4.24274 6.8763 4.72548 6.04018C5.76571 4.23845 7.04361 2.75996 8.29806 1.83609C8.92431 1.37487 9.57441 1.02999 10.211 0.870901C10.8524 0.71059 11.5278 0.729863 12.1219 1.07291C12.8408 1.48795 13.2049 2.23634 13.3452 3.03257C13.486 3.83168 13.4232 4.77409 13.2058 5.7634C13.1169 6.16796 12.7169 6.42388 12.3124 6.33501C11.9078 6.24613 11.6519 5.84612 11.7408 5.44155C11.9322 4.56992 11.9637 3.83647 11.868 3.29288C11.7717 2.7464 11.5681 2.48524 11.3719 2.37195C11.2076 2.27705 10.9574 2.23049 10.5747 2.32614C10.1871 2.42301 9.71442 2.65588 9.18757 3.04388C8.13584 3.81846 6.98632 5.12428 6.02452 6.79018C5.58214 7.55639 5.22369 8.32235 4.95185 9.0549C4.80774 9.44323 4.37611 9.64122 3.98778 9.49712Z' fill='%23000000'/%3E%3Cpath d='M9.45925 8.06618C9.45925 8.81694 8.85063 9.42556 8.09987 9.42556C7.34911 9.42556 6.7405 8.81694 6.7405 8.06618C6.7405 7.31542 7.34911 6.70681 8.09987 6.70681C8.85063 6.70681 9.45925 7.31542 9.45925 8.06618Z' fill='%23000000'/%3E%3C/svg%3E", /* <<< REPLACE (TSX / React) */
  "html":            "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='800px' height='800px' viewBox='-1 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Ehtml %5B%23124%5D%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Dribbble-Light-Preview' transform='translate(-61.000000, -7639.000000)' fill='%23000000'%3E%3Cg id='icons' transform='translate(56.000000, 160.000000)'%3E%3Cpath d='M19.4350881,7485 L19.4279481,7485 L10.8119794,7485 L11.0180201,7487 L19.2300674,7487 C19.109707,7488.752 18.7455658,7492.464 18.6119454,7494.153 L13.99949,7495.451 L13.99949,7495.455 L13.98929,7495.46 L9.37377458,7493.836 L9.05757353,7490 L11.3199411,7490 L11.4800816,7492.063 L13.99337,7493 L13.99949,7493 L16.5086984,7492.1 L16.7667592,7489 L8.95659319,7489 C8.91885306,7488.599 8.43333144,7483.392 8.34867116,7483 L19.6370488,7483 C19.5738086,7483.66 19.5095484,7484.338 19.4350881,7485 L19.4350881,7485 Z M5,7479 L6.63812546,7497.148 L13.98929,7499 L21.3598345,7497.111 L23,7479 L5,7479 Z' id='html-%5B%23124%5D'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E", /* <<< REPLACE with your HTML SVG data URI */
  "css":             "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg fill='%23000000' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='800px' height='800px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Cg id='c133de6af664cd4f011a55de6b001b19'%3E%3Cpath display='inline' d='M483.111,0.501l-42.59,461.314l-184.524,49.684L71.47,461.815L28.889,0.501H483.111z M397.29,94.302 H255.831H111.866l6.885,55.708h137.08h7.7l-7.7,3.205l-132.07,55.006l4.38,54.453l127.69,0.414l68.438,0.217l-4.381,72.606 l-64.058,18.035v-0.057l-0.525,0.146l-61.864-15.617l-3.754-45.07h-0.205H132.1h-0.202l7.511,87.007l116.423,34.429v-0.062 l0.21,0.062l115.799-33.802l15.021-172.761h-131.03h-0.323l0.323-0.14l135.83-58.071L397.29,94.302z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E", /* <<< REPLACE with your CSS SVG data URI */
  "json":            "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg fill='%23000000' width='800px' height='800px' viewBox='0 0 32 32' id='icon' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3EJSON%3C/title%3E%3Cpolygon points='31 11 31 21 29 21 27 15 27 21 25 21 25 11 27 11 29 17 29 11 31 11'/%3E%3Cpath d='M21.3335,21h-2.667A1.6684,1.6684,0,0,1,17,19.3335v-6.667A1.6684,1.6684,0,0,1,18.6665,11h2.667A1.6684,1.6684,0,0,1,23,12.6665v6.667A1.6684,1.6684,0,0,1,21.3335,21ZM19,19h2V13H19Z'/%3E%3Cpath d='M13.3335,21H9V19h4V17H11a2.002,2.002,0,0,1-2-2V12.6665A1.6684,1.6684,0,0,1,10.6665,11H15v2H11v2h2a2.002,2.002,0,0,1,2,2v2.3335A1.6684,1.6684,0,0,1,13.3335,21Z'/%3E%3Cpath d='M5.3335,21H2.6665A1.6684,1.6684,0,0,1,1,19.3335V17H3v2H5V11H7v8.3335A1.6684,1.6684,0,0,1,5.3335,21Z'/%3E%3Crect id='_Transparent_Rectangle_' data-name='&lt;Transparent Rectangle&gt;' class='cls-1' width='32' height='32'/%3E%3C/svg%3E", /* <<< REPLACE */
  "cpp":             "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='800px' height='800px' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M27.6947 22.9999C27.883 22.6617 28 22.2807 28 21.9385V10.0613C28 9.71913 27.8831 9.33818 27.6947 9L16 16L27.6947 22.9999Z' fill='%2300599C'/%3E%3Cpath d='M17.0395 29.7433L26.9611 23.8047C27.2469 23.6336 27.5067 23.3382 27.695 23L16.0003 16L4.30566 23C4.49398 23.3382 4.75382 23.6337 5.03955 23.8047L14.9611 29.7433C15.5326 30.0855 16.468 30.0855 17.0395 29.7433Z' fill='%23004482'/%3E%3Cpath d='M27.6947 8.99996C27.5064 8.6617 27.2465 8.36629 26.9608 8.19521L17.0392 2.25662C16.4677 1.91446 15.5323 1.91446 14.9608 2.25662L5.03922 8.19521C4.46761 8.53729 4 9.37709 4 10.0613V21.9386C4 22.2807 4.11694 22.6618 4.30533 23L16 16L27.6947 8.99996Z' fill='%23659AD2'/%3E%3Cpath d='M16.0385 24C11.6061 24 8 20.4112 8 16C8 11.5888 11.6061 8 16.0385 8C18.8458 8 21.4674 9.47569 22.919 11.8618L19.4765 13.9265C18.7492 12.736 17.4399 12 16.0385 12C13.8222 12 12.0193 13.7944 12.0193 16C12.0193 18.2056 13.8222 20 16.0385 20C17.4362 20 18.7421 19.2681 19.4707 18.0832L22.9205 20.1359C21.4692 22.5234 18.8467 24 16.0385 24Z' fill='white'/%3E%3Cpath d='M23 15.4948H21.9999V14.5H21.0001V15.4948H20V16.4895H21.0001V17.4844H21.9999V16.4895H23V15.4948Z' fill='white'/%3E%3Cpath d='M27 15.5H25.9999V14.5H25.0001V15.5H24V16.4999H25.0001V17.5H25.9999V16.4999H27V15.5Z' fill='white'/%3E%3C/svg%3E", /* <<< REPLACE */
  "c":               "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' viewBox='0 0 38.000089 42.000031' width='380.00089' height='420.00031' version='1.1' id='svg10' sodipodi:docname='icons8-c-programming.svg' inkscape:version='1.0.1 (3bc2e813f5, 2020-09-07)'%3E%3Cmetadata id='metadata16'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E%3Cdc:title%3E%3C/dc:title%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cdefs id='defs14' /%3E%3Csodipodi:namedview pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1' objecttolerance='10' gridtolerance='10' guidetolerance='10' inkscape:pageopacity='0' inkscape:pageshadow='2' inkscape:window-width='1920' inkscape:window-height='1056' id='namedview12' showgrid='false' fit-margin-top='0' fit-margin-left='0' fit-margin-right='0' fit-margin-bottom='0' inkscape:zoom='1.4895833' inkscape:cx='190' inkscape:cy='210.00282' inkscape:window-x='0' inkscape:window-y='0' inkscape:window-maximized='1' inkscape:current-layer='svg10' /%3E%3Cpath fill='%23283593' fill-rule='evenodd' d='m 17.903,0.28628166 c 0.679,-0.381 1.515,-0.381 2.193,0 C 23.451,2.1692817 33.547,7.8372817 36.903,9.7202817 37.582,10.100282 38,10.804282 38,11.566282 c 0,3.766 0,15.101 0,18.867 0,0.762 -0.418,1.466 -1.097,1.847 -3.355,1.883 -13.451,7.551 -16.807,9.434 -0.679,0.381 -1.515,0.381 -2.193,0 -3.355,-1.883 -13.451,-7.551 -16.807,-9.434 -0.678,-0.381 -1.096,-1.084 -1.096,-1.846 0,-3.766 0,-15.101 0,-18.867 0,-0.762 0.418,-1.466 1.097,-1.8470003 3.354,-1.883 13.452,-7.551 16.806,-9.43400004 z' clip-rule='evenodd' id='path2' style='fill:%23004482;fill-opacity:1' /%3E%3Cpath fill='%235c6bc0' fill-rule='evenodd' d='m 0.304,31.404282 c -0.266,-0.356 -0.304,-0.694 -0.304,-1.149 0,-3.744 0,-15.014 0,-18.759 0,-0.758 0.417,-1.458 1.094,-1.8360003 3.343,-1.872 13.405,-7.507 16.748,-9.38000004 0.677,-0.379 1.594,-0.371 2.271,0.008 3.343,1.87200004 13.371,7.45900004 16.714,9.33100004 0.27,0.152 0.476,0.335 0.66,0.5760003 z' clip-rule='evenodd' id='path4' style='fill:%23659ad2;fill-opacity:1' /%3E%3Cpath fill='%23ffffff' fill-rule='evenodd' d='m 19,7.0002817 c 7.727,0 14,6.2730003 14,14.0000003 0,7.727 -6.273,14 -14,14 -7.727,0 -14,-6.273 -14,-14 0,-7.727 6.273,-14.0000003 14,-14.0000003 z m 0,7.0000003 c 3.863,0 7,3.136 7,7 0,3.863 -3.137,7 -7,7 -3.863,0 -7,-3.137 -7,-7 0,-3.864 3.136,-7 7,-7 z' clip-rule='evenodd' id='path6' /%3E%3Cpath fill='%233949ab' fill-rule='evenodd' d='m 37.485,10.205282 c 0.516,0.483 0.506,1.211 0.506,1.784 0,3.795 -0.032,14.589 0.009,18.384 0.004,0.396 -0.127,0.813 -0.323,1.127 l -19.084,-10.5 z' clip-rule='evenodd' id='path8' style='fill:%2300599c;fill-opacity:1' /%3E%3C/svg%3E%0A",
  "java":            "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg fill='%23000000' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='800px' height='800px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Cg id='5151e0c8492e5103c096af88a51e8d81'%3E%3Cpath display='inline' d='M193.918,208.369c-4.729-10.456-6.849-22.652-3.236-33.731c3.612-11.327,11.703-20.413,19.794-28.878 c22.525-22.531,50.285-39.085,72.316-61.986c12.197-12.573,22.278-27.634,25.762-44.937c2.864-12.695,1.496-25.764-1.117-38.337 c11.7,13.319,15.559,32.363,12.197,49.541c-3.608,19.292-14.316,36.344-26.886,51.031c-10.081,11.827-21.659,22.282-33.731,31.993 c-14.065,11.327-27.88,23.524-36.716,39.457c-7.472,12.943-9.215,28.876-4.11,42.942c8.341,24.146,27.756,42.071,38.338,64.848 c-11.703-10.332-23.152-21.036-33.86-32.361C211.471,236.001,200.889,223.307,193.918,208.369z M257.398,189.448 c-2.115,19.792,8.213,38.462,20.539,53.151c5.972,6.596,11.076,14.687,11.323,23.899c0.251,12.318-6.716,23.774-15.684,31.861 c2.119-0.246,3.612-2.115,5.355-3.11c13.443-8.589,26.385-19.418,32.982-34.227c4.357-10.083,3.362-22.034-2.362-31.371 c-6.724-10.953-15.559-20.662-20.786-32.61c-2.867-6.721-3.862-14.562-1.496-21.657c3.114-9.583,9.834-17.426,16.93-24.272 c19.54-18.544,43.189-31.743,65.844-46.179c-28.629,8.214-56.883,19.542-81.03,37.343 C273.702,153.727,259.515,169.658,257.398,189.448z M393.447,283.052c13.568,0.748,26.882,10.704,29.374,24.397 c2.366,11.825-3.358,23.524-10.705,32.485c-12.075,14.438-28.382,24.771-44.807,33.609c-1.622,0.991-2.99,2.237-4.235,3.608 c21.659-5.478,43.314-13.689,60.867-27.756c9.705-8.091,18.294-18.799,20.163-31.619c1.743-11.076-2.86-22.528-11.077-29.871 c-9.96-9.09-24.021-12.448-37.218-10.704c-7.593,0.995-15.931,2.613-21.158,8.961C380.877,284.921,386.971,282.429,393.447,283.052 z M123.22,318.647c16.303,4.357,33.108,5.603,49.787,6.724c14.936,0.995,29.875,1.246,44.937,1.12 c38.833-0.619,77.916-3.236,116.003-11.699c3.608-0.87,7.593-1.493,10.833-3.733c6.347-4.11,13.313-7.347,20.162-10.583 c-30.995,4.979-62.113,9.215-93.478,11.205c-31.74,1.991-63.731,3.236-95.593,1.121c-9.086-0.87-18.423-1.371-26.886-4.858 c-1.994-0.87-4.733-2.609-3.738-5.227c1.869-3.361,5.603-4.977,8.839-6.72c13.694-6.473,28.629-10.081,43.193-14.313 c-25.021-0.376-49.916,5.971-72.814,15.806c-5.105,2.491-10.83,4.481-14.936,8.714c-1.622,1.739-1.622,4.732,0.247,6.222 C113.511,315.787,118.487,317.28,123.22,318.647z M324.864,352.88c-21.784,3.859-43.694,7.472-65.726,8.589 c-24.147,1.618-48.294,0.247-72.191-2.241c-4.604-0.623-9.211-1.368-13.317-3.483c-2.116-1.246-4.231-3.236-4.106-5.854 c0.247-4.106,3.73-6.967,6.222-9.956c-7.715,2.739-15.434,5.599-21.906,10.708c-2.742,2.116-5.478,5.474-4.733,9.208 c1.125,4.356,5.356,6.97,9.09,8.96c9.208,4.733,19.54,6.846,29.625,8.714c25.511,4.11,51.527,4.235,77.167,2.488 c27.141-2.115,54.148-6.594,80.411-14.313C337.932,362.342,330.836,358.479,324.864,352.88z M188.068,395.951 c-6.97,1.99-14.066,4.357-19.79,8.957c-2.868,2.241-5.105,6.104-3.734,9.713c1.743,4.604,6.1,7.347,10.203,9.705 c10.708,5.854,22.78,8.589,34.604,10.708c26.765,4.229,54.27,3.608,80.908-1.12c15.806-2.989,31.615-7.221,46.301-13.815 c-9.584-3.984-18.917-8.467-27.878-13.693c-15.559,2.738-31.246,5.603-47.178,6.598c-21.032,1.618-42.319-0.125-63.355-2.738 c-4.98-1.121-11.202-1.618-14.563-5.976C181.847,400.677,185.828,398.063,188.068,395.951z M358.345,475.982 c17.424-3.604,34.977-7.719,50.908-15.806c4.976-2.867,11.076-5.979,12.698-11.95c0.87-5.725-5.105-8.714-9.337-11.08 c2.613,2.993,4.356,7.347,1.74,10.83c-4.357,5.853-11.821,8.091-18.42,10.332c-20.66,5.85-42.072,8.216-63.355,10.582 c-56.385,5.102-113.146,6.348-169.528,1.618c-18.92-1.994-38.217-4.109-56.264-10.829c-2.86-1.246-7.217-2.492-7.217-6.352 c1.117-3.354,4.357-5.227,7.217-6.845c12.945-6.595,27.384-10.207,41.822-11.077c-4.228-2.491-9.208-2.738-14.062-2.613 c-12.076,0.373-23.9,3.483-35.349,7.347c-9.834,3.604-19.916,7.59-27.76,14.811c-3.111,2.735-5.971,7.962-2.739,11.699 c4.98,5.353,12.699,6.72,19.54,8.338c38.338,6.599,77.171,10.328,116.011,11.699C255.781,488.184,307.684,485.942,358.345,475.982z M409.378,482.706c-23.402,7.468-47.672,11.574-71.822,14.936c-41.696,5.227-83.769,6.845-125.716,5.603 c-25.515-0.995-51.03-2.738-76.176-6.974c5.85,3.984,13.071,5.227,19.794,7.096c28.257,5.976,57.255,7.096,86.01,7.966 c42.19,0.748,84.387-0.87,125.962-7.468c19.669-3.48,39.459-7.715,57.13-16.927c9.215-4.854,18.552-12.326,20.163-23.152 C435.391,473.741,421.951,478.349,409.378,482.706z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E", /* <<< REPLACE */
  "sql":             "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg fill='%23000000' width='800px' height='800px' viewBox='0 0 32 32' id='icon' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ESQL%3C/title%3E%3Cpolygon points='24 21 24 9 22 9 22 23 30 23 30 21 24 21'/%3E%3Cpath d='M18,9H14a2,2,0,0,0-2,2V21a2,2,0,0,0,2,2h1v2a2,2,0,0,0,2,2h2V25H17V23h1a2,2,0,0,0,2-2V11A2,2,0,0,0,18,9ZM14,21V11h4V21Z'/%3E%3Cpath d='M8,23H2V21H8V17H4a2,2,0,0,1-2-2V11A2,2,0,0,1,4,9h6v2H4v4H8a2,2,0,0,1,2,2v4A2,2,0,0,1,8,23Z'/%3E%3Crect id='_Transparent_Rectangle_' data-name='&lt;Transparent Rectangle&gt;' class='cls-1' width='32' height='32'/%3E%3C/svg%3E", /* <<< REPLACE */
  "markdown":        "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='800px' height='800px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 8C0 5.79086 1.79086 4 4 4H20C22.2091 4 24 5.79086 24 8V16C24 18.2091 22.2091 20 20 20H4C1.79086 20 0 18.2091 0 16V8ZM4 6C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6H4ZM5.68377 8.05132C6.09211 7.9152 6.54174 8.05566 6.8 8.4L9 11.3333L11.2 8.4C11.4583 8.05566 11.9079 7.9152 12.3162 8.05132C12.7246 8.18743 13 8.56957 13 9V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V12L9.8 13.6C9.61115 13.8518 9.31476 14 9 14C8.68524 14 8.38885 13.8518 8.2 13.6L7 12V15C7 15.5523 6.55228 16 6 16C5.44772 16 5 15.5523 5 15V9C5 8.56957 5.27543 8.18743 5.68377 8.05132ZM18 9C18 8.44772 17.5523 8 17 8C16.4477 8 16 8.44772 16 9V12.5858L15.7071 12.2929C15.3166 11.9024 14.6834 11.9024 14.2929 12.2929C13.9024 12.6834 13.9024 13.3166 14.2929 13.7071L16.2929 15.7071C16.6834 16.0976 17.3166 16.0976 17.7071 15.7071L19.7071 13.7071C20.0976 13.3166 20.0976 12.6834 19.7071 12.2929C19.3166 11.9024 18.6834 11.9024 18.2929 12.2929L18 12.5858V9Z' fill='%23000000'/%3E%3C/svg%3E", /* <<< REPLACE */
};

let lastWatermarkLang = "default";

/* Finds VS Code's language-icon class from the active editor tab.
   Examples:
   javascript-lang-file-icon
   javascriptreact-lang-file-icon
   python-lang-file-icon
*/
function getActiveLanguageId() {
  const activeTab =
    document.querySelector(".editor-group-container.active .tab.active") ||
    document.querySelector(".tab.active");

  if (!activeTab) return null;

  const iconElement =
    activeTab.querySelector(".monaco-icon-label") ||
    activeTab.querySelector("[class*='-lang-file-icon']") ||
    activeTab;

  const classes = Array.from(iconElement.classList);

  const languageClass = classes.find((className) =>
    className.endsWith("-lang-file-icon")
  );

  if (!languageClass) return null;

  return languageClass
    .replace("-lang-file-icon", "")
    .toLowerCase();
}

function applyWatermarkIcon() {
  const detectedLanguage = getActiveLanguageId();

  if (detectedLanguage) {
    lastWatermarkLang = detectedLanguage;
  }

  const icon =
    LANGUAGE_ICONS[lastWatermarkLang] ||
    LANGUAGE_ICONS.default ||
    DEFAULT_ICON;

  document
    .querySelectorAll(".editor-group-watermark .letterpress")
    .forEach((watermark) => {
      watermark.style.setProperty(
        "background-image",
        `url("${icon}")`,
        "important"
      );

      watermark.style.setProperty(
        "background-size",
        "contain",
        "important"
      );

      watermark.style.setProperty(
        "background-repeat",
        "no-repeat",
        "important"
      );

      watermark.style.setProperty(
        "background-position",
        "center",
        "important"
      );
    });
}

/* VS Code constantly replaces tabs and empty-editor elements.
   A small polling loop is more reliable than a one-time observer. */
setInterval(applyWatermarkIcon, 700);

window.addEventListener("load", () => {
  setTimeout(applyWatermarkIcon, 1000);
});

/* Run once immediately if the script loads after the workbench. */
setTimeout(applyWatermarkIcon, 1500);