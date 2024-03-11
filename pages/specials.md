---
title: Specials
description: Truly my home ♥
permalink: /specials/
image:
    path: /assets/images/site-logo.webp
preload:
    - url: '/assets/images/Yune.webp'
      type: 'image'
    - url: 'https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_200x51.png'
      type: 'image'
---

# About me

<span>I am</span>
<img src="/assets/images/Yune.webp" alt="Profile Picture of Yune" width="24" height="24" style="border-radius: 50%;margin: 0 5px;vertical-align:middle;">
<span>Yune, I want to do something for a change instead of procasinating.</span>

# Links

<div>
  <div><a href="https://steamcommunity.com/id/Junhaochia">steamcommunity.com/id/Junhaochia</a></div>
  <iframe title="Steam Miniprofile of Yune" id="iframe-smp" loading="lazy" scrolling="no" width="328px" height="210px" style="border: 0px;"></iframe>
  <script id="steam-smp" type="application/javascript">
  {
    const rm_srcset = /srcset=".*"/g;
    const style = `@import url("https://community.akamai.steamstatic.com/public/shared/css/shared_global.css");

    /* Remove Borders */
    body {
      margin: 0;
    }

    /* Make avatar border looks better */
    .border_color_offline {
      border-color: transparent;
    }

    .border_color_online {
      border-color: transparent;
    }

    .border_color_in-game {
      border-color: transparent;
    }

    .border_color_golden {
      border-color: transparent;
    }`;

    fetch('https://www.whateverorigin.org/get?url=https://steamcommunity.com/miniprofile/192010363')
    .then((res) => res.json()).then((res) => {
      const smp = document.getElementById('iframe-smp');
      smp.srcdoc = (
            '<!DOCTYPE html><html lang="en-US"><head><style>' +
            style +
            '</style></head><body>' +
            res.content.replace(rm_srcset, '').replace('_medium.jpg', '_full.jpg') +
            "<script>parent.postMessage(`${document.body.scrollHeight}px${window.location.href}`,'*');</script></body></html>"
        );
      window.addEventListener("message", function (e) { if (typeof(e.data) === "string" && e.data.includes(smp.src)) smp.height = e.data.slice(0, 5); });
    });

}
</script>

</div>

[Team Junhao Discord Server](https://discord.gg/9QeEzAq)

[Iruma Discord Server](https://discord.gg/M79cK6g)

# Donate

[![Donate with PayPal](https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_200x51.png 'Paypal Logo')](https://paypal.me/Junhaochia)

# Extras

<marquee
  direction="down"
  width="640"
  height="360"
  scrollamount="4"
  behavior="alternate"
  style="border:solid">
<marquee scrollamount="4" behavior="alternate"><div style="width: 25px;height: 25px;background: black;"/></marquee>
</marquee>
