# 1dv449-lab1
Lab 1 in the course Webbteknik 2

**Finns det några etiska aspekter vid webbskrapning. Kan du hitta något rättsfall?**
Man bör tänka efter vad man använder det skrapade datat till. Det kan till exempel vara känslig eller privat data.
Man bör ge credit till datats ursprungliga ägare.
Det är lätt att göra många förfrågningar med hjälp av en webbskrapa, man bör därför försöka få ner antalet förfrågningar för att inte stjäla resurser från servern.

Det finns en handfull rättsfall gällande webbskrapning, det kanske mest kända var det som Facebook vann, https://www.techdirt.com/articles/20090605/2228205147.shtml. Ofta handlar det om att skrapningen har brutit mot användarvillkor, som i fallet eBay v Bidder's Edge (http://www.tomwbell.com/NetLaw/Ch06/eBay.html). 

**Finns det några riktlinjer för utvecklare att tänka på om man vill vara "en god skrapare" mot serverägarna?**
Först och främst bör man se över *användarvillkor* och *robots.txt* för att se om det är okej att skrapa, och vilken information man får hämta. Sedan bör man i största möjliga mån försöka minska antalet förfrågningar till servern. Man bör även se över om man använder känslig/privat data och man bör ge credits till ursprungssidan om man använder skrapad data. 

**Begränsningar i din lösning- vad är generellt och vad är inte generellt i din kod?**
Det är svårt att skriva en skrapa som är generell för olika typer av webbplatser, och det mesta i min kod går antagligen bara att använda för just labbens webbplats. 

Vissa förändringar kan komma att få skrapan att sluta fungera.

Generellt
Hitta personer och deras tillgängliga dagar.
Generella lösningar för att hitta antalet HTML-nodes och iterera över dem.

Inte generellt
Jämföra dagar som personerna är tillgängliga.
Dagar och filmertitlar är hårdkodade.
Om man ändrar i HTML-källkoden och till exempel byter ut ett HTML-element till ett annat så kommer skrapan sluta fungera.

**Vad kan robots.txt spela för roll?**
Robots.txt  kan innehålla information om vad som får skrapas, och om man får skrapa. Här kan site-ägaren även ge instruktioner till skrapor om var de får eller inte får skrapa, vilket är vanligt när det kommer till så kallad "crawlers" som används av sökmotorer.
