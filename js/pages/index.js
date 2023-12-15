document.addEventListener("DOMContentLoaded", async () => {
  // console.log("inicio");
  _FIRE.initFirebase();

  _aux.checkChangeState();

  banner.start();
  html_Comp.conteudo(`<div id="Content">
  <div id="bannerL"><!-- Tag ID: lipsumcom_left_siderail -->
  <div align="center" data-freestar-ad="__300x600" id="lipsumcom_left_siderail">
  <script data-cfasync="false" type="text/javascript">
      freestar.config.enabled_slots.push({ placementName: "lipsumcom_left_siderail", slotId: "lipsumcom_left_siderail" });
  </script>
  </div></div>
  <div id="bannerR"><!-- Tag ID: lipsumcom_right_siderail -->
  <div align="center" data-freestar-ad="__300x600" id="lipsumcom_right_siderail">
  <script data-cfasync="false" type="text/javascript">
      freestar.config.enabled_slots.push({ placementName: "lipsumcom_right_siderail", slotId: "lipsumcom_right_siderail" });
  </script>
  </div></div>
  <div id="Panes"><div>
  <h2>What is Lorem Ipsum?</h2>
  <p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div><div>
  <h2>Why do we use it?</h2>
  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
  </div><br><div>
  `);

  document.querySelector("#cont-cont").classList.add("w-100");
  document.querySelector("#cont-cont").classList.add("w-75");
  function checkSize() {
    setInterval(() => {
      document.querySelector("#cont-cont").classList.contains("w-75")
        ? document.querySelector("#cont-cont").classList.remove("w-75")
        : "";

      document.querySelector("#cont-cont").classList.contains("w-100")
        ? document.querySelector("#cont-cont").classList.remove("w-100")
        : "";

      if (window.screen.width < 795) {
        document.querySelector("#cont-cont").classList.add("w-100");
      } else {
        document.querySelector("#cont-cont").classList.add("w-75");
      }
    }, 500);
  }
  checkSize()
  
  html_Comp.rodape();
});
