class Github {
    static http() {
        return class {
            static URL = 'https://api.github.com/repos/langprogramming-AsmX/AsmX';

            static get(route) {
                return fetch(`${this.URL}${route}`, { method: 'GET' }).then(response => response.json());
            }
        }
    }

    static async releases() {
        return this.http().get('/releases');
    }

    static async stargazers() {
        return this.http().get('/stargazers');
    }

    static async readme() {
        return fetch('https://api.github.com/repos/langprogramming-AsmX/AsmX/contents/README.md?ref=main', {
            method: 'GET'
        }).then(data => data.json())
    }
}


Github.releases().then((response) => {
    let elementHTMLReleases = document.querySelector('.releases-list');
    let countReleases = 0;
    
    for (const release of response) {
        // release -> asets -> archives
        // .releases-list -> releases-list__release + (version, tag) -> releases-list__release-assets
        let releaseElement = document.createElement('details');
        releaseElement.className = 'releases-list__release';

        let releaseVersionElement = document.createElement('summary');
        releaseVersionElement.innerHTML = `${release['name']} (${release['tag_name']}) ${countReleases == 0 ? '<div title="Latest" class="latest" data-view-component="true">Latest</div>' : ''}`;

        let releaseAssetsElement = document.createElement('details');
        releaseAssetsElement.className ='releases-list__release-assets';
    
        let releaseAssetsCountElement = document.createElement('summary');
        releaseAssetsCountElement.innerHTML = `Assets <span title="${release['assets'].length}" data-view-component="true" class="Counter ml-1">${release['assets'].length}</span>`;
        releaseAssetsElement.appendChild(releaseAssetsCountElement);
        
        for (const archive of release['assets']) {
            let releaseAssetsArchiveElement = document.createElement('div');
            releaseAssetsArchiveElement.className = 'releases-list__release-assets_archive';
            releaseAssetsElement.appendChild(releaseAssetsArchiveElement);
    
            let href = document.createElement('a');
            href.href = archive['browser_download_url'];
            href.text = archive['name'] + ` (downloaded ${archive['download_count']})`;

            releaseAssetsArchiveElement.appendChild(href);
        }
    
        releaseElement.appendChild(releaseVersionElement);
        releaseElement.appendChild(releaseAssetsElement);
        elementHTMLReleases.appendChild(releaseElement);
        countReleases++;
    }
});

Github.stargazers().then((response) => {
    let elementHTMLStargazers = document.querySelector('.stargazers-list');
    let elementHTMLStargazersCount = document.querySelector('.stargazers-list_count');
    elementHTMLStargazersCount.innerHTML = response.length;

    for (const star of response) {
        let GitHubUser = document.createElement('div');
        GitHubUser.className = 'stargazers-list_user';
        let avatarGitHubUser = document.createElement('div');
        avatarGitHubUser.style.backgroundImage = `url(${star['avatar_url']}`;
        avatarGitHubUser.title = star['login'];
        avatarGitHubUser.style.backgroundSize = '50px';
        avatarGitHubUser.style.backgroundRepeat = 'no-repeat';
        avatarGitHubUser.style.borderRadius = '50%';

        GitHubUser.style.padding = '5px';
        
        let hrefGitHubUser = document.createElement('a');
        hrefGitHubUser.href = star['html_url'];

        hrefGitHubUser.appendChild(avatarGitHubUser);
        GitHubUser.appendChild(hrefGitHubUser);
        elementHTMLStargazers.appendChild(GitHubUser);
    }
})