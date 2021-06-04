---
title: Specials
description: Truly my home ♥
permalink: /specials/
image:
  path: /assets/site-logo.webp
---
# Credits
N/A

# About Me and only ME
I do things, I guess.

# Links
[Steam Community :: June](https://steamcommunity.com/id/Junhaochia)
<div id="steam_miniprofile" style="display: none;" width="328px" height="210px"></div>
<script>
var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText).reverse();
      document.getElementById("steam_miniprofile").innerHTML = data;
      document.getElementById("steam_miniprofile").style.display = "block";
      setPage(data);
  } else if (this.readyState == 4 && this.status != 200) {
      document.getElementById("steam_miniprofile").innerHTML = `An error has occured (${this.status})`
  }
  };
  xmlhttp.open("GET", "https://steamcommunity.com/miniprofile/192010363", true);
  xmlhttp.send();
window.onload = function() {
  document.getElementsByTagName('head')[0].appendChild( '<link rel="stylesheet" type="text/css" href="https://www.junhao.page/assets/css/steam_miniprofile.css">' );
}
</script>

[![Team Junhao Discord Server](https://discord.com/api/guilds/661447151426994176/widget.png?style=banner2)](https://discord.gg/9QeEzAq)

[![Iruma Discord Server](https://discord.com/api/guilds/735144130484895797/widget.png?style=banner2)](https://discord.gg/M79cK6g)

# Donate
[paypal.me/Junhaochia](https://paypal.me/Junhaochia)