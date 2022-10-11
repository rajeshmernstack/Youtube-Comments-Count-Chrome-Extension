if (document.location.href.includes("https://www.youtube.com/results?search_query=")) {
    console.log("I am on Search Results page")
    function searchResultPage(api) {
        let allVideos = []
        document.querySelectorAll('#thumbnail').forEach((item) => allVideos.push(item.href))
        allVideos = allVideos.filter(item => typeof item != "undefined" && item.includes("/watch?v="))
        allVideos.forEach((item, index) => {
            item = item.substring(32, 43);
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let resp = JSON.parse(xhttp.response)
                    console.log(resp.items[0].statistics.commentCount);
                    if (document.querySelector(`.cmnt-${item}`)) {
                        if (typeof resp.items[0].statistics.commentCount == "undefined") {
                            document.querySelector(`.cmnt-${item}`).innerText = "OFF"
                        } else {
                            document.querySelector(`.cmnt-${item}`).innerText = resp.items[0].statistics.commentCount + " Comment";
                        }
                    } else {
                        let cmnt = document.createElement('div');
                        cmnt.classList.add(`cmnt-${item}`)
                        cmnt.setAttribute('style', 'background-color: bglight; height: 25px; border: 4px solid; margin-top: -12px; text-align: center;')
                        if (typeof resp.items[0].statistics.commentCount == 'undefined') {
                            cmnt.innerText = "OFF";
                        } else {
                            cmnt.innerText = resp.items[0].statistics.commentCount + " Comments";
                        }
                        document.querySelector(`a[href^="/watch?v=${item}"]`).parentNode.parentNode.appendChild(cmnt)
                    }
                }
            };
            xhttp.open("GET", `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item}&key=${api}`, true);
            xhttp.send();
        })
    }
    setInterval(() => {
        searchResultPage("AIzaSyB1TtNfobyoIUWzUgzQkRU_HsWDvNfiOs4")
    }, 10000);
}
else if (document.location.href === "https://www.youtube.com/") {
    function homepage(api) {
        let all = [];
        document.querySelectorAll('#thumbnail').forEach((item) => all.push(item.href))
        all = all.filter(item => item.includes('/watch?v='))
        all.forEach((item, index) => {
            item = item.substring(32, 43);
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let resp = JSON.parse(xhttp.response)
                    console.log(resp.items[0].statistics.commentCount);
                    if (document.querySelector(`.cmnt-${item}`)) {
                        if (typeof resp.items[0].statistics.commentCount == "undefined") {
                            document.querySelector(`.cmnt-${item}`).innerText = "OFF"
                        } else {
                            document.querySelector(`.cmnt-${item}`).innerText = resp.items[0].statistics.commentCount + " Comments"
                        }
                    } else {
                        let cmnt = document.createElement('div');
                        cmnt.classList.add(`cmnt-${item}`)
                        cmnt.setAttribute('style', 'background-color: bglight; height: 25px; border: 4px solid; margin-top: -12px; text-align: center;')
                        if (typeof resp.items[0].statistics.commentCount == 'undefined') {
                            cmnt.innerText = "OFF";
                        } else {
                            cmnt.innerText = resp.items[0].statistics.commentCount + " Comments";
                        }
                        document.querySelector(`a[href^="/watch?v=${item}"]`).parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(cmnt);
                    }
                }
            };
            xhttp.open("GET", `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item}&key=${api}`, true);
            xhttp.send();
        });
    }
    setInterval(() => {
        homepage("AIzaSyB1TtNfobyoIUWzUgzQkRU_HsWDvNfiOs4")
    }, 10000)
}
else if (document.location.href.includes("https://www.youtube.com/watch?v=")) {
    console.log("i am on video player mode")
    function videoPlayerPage(api) {
        var allContents = document.querySelectorAll('#contents');
        var allVideos = allContents[allContents.length - 1]
        console.log(allVideos)

        for (const item of allVideos.children) {
            if (typeof item != "undefined") {
                let url = item.children[0].children[1].children[0].children[0].href.substring(32, 43);
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        let resp = JSON.parse(xhttp.response)

                        if (document.querySelector(`.cmnt-${url}`)) {
                            if (typeof resp.items[0].statistics.commentCount == "undefined") {
                                document.querySelector(`.cmnt-${url}`).innerText = "OFF"
                            } else {
                                document.querySelector(`.cmnt-${url}`).innerText = resp.items[0].statistics.commentCount + " Comments";
                            }
                        } else {
                            let cmnt = document.createElement('div');
                            cmnt.classList.add(`cmnt-${url}`)
                            cmnt.innerText = resp.items[0].statistics.commentCount + " Comments";
                            cmnt.setAttribute('style', 'padding-top: 5px; background-color: bglight; height: 15px; border: 1px solid; margin-top: 1px; text-align: center;')
                            item.children[0].children[1].children[0].children[0].appendChild(cmnt)
                        }
                    }
                };
                xhttp.open("GET", `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${url}&key=${api}`, true);
                xhttp.send();
            }
        }
    }
    setInterval(() => {
        videoPlayerPage("AIzaSyB1TtNfobyoIUWzUgzQkRU_HsWDvNfiOs4")
    }, 10000)
}