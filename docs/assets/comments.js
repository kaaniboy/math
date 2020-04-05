const GITHUB_TOKEN = 'INSERT_TOKEN_HERE';

async function setupComments(ghUsername, ghRepo, postTitle) {
    const commentsUrl = await getCommentsURL(ghUsername, ghRepo, postTitle);
    if (commentsUrl === null) {
        hideComments();
        return;
    }
    const comments = await getComments(commentsUrl);
    if (comments === null) {
        hideComments();
        return;
    }
    displayComments(comments);
}

async function getCommentsURL(ghUsername, ghRepo, postTitle) {
    const issueSearchURL = `https://api.github.com/repos/${ghUsername}/${ghRepo}/issues?labels=${postTitle}`;

    let issues;
    try {    
        issues = await (await fetch(issueSearchURL, getAuth())).json();
    } catch(err) {
        console.log('Could not connect to GitHub API.');
        return null;;
    }

    if (issues.length === 0) {
        console.log('Could not find associated issue for post on GitHub.');
        return null;
    }
    return issues[0].comments_url;
}

async function getComments(commentsURL) {
    let comments;
    try {
        comments = await (await fetch(commentsURL, getAuth())).json();
    } catch (err) {
        console.log('Could not load comments from GitHub issue.');
        return null;
    }

    const converter = new showdown.Converter();
    comments = comments.map(c => ({
        username: c.user.login,
        image: c.user.avatar_url,
        body: converter.makeHtml(c.body),
        created_at: c.created_at
    }));
    console.log(comments);
    return comments;
}

function displayComments(comments) {
    let commentsDiv = document.getElementById('comments_list');

    if (comments.length === 0) {
        commentsDiv.innerHTML = '<i>There are no comments here yet. Be the first!</i>'
        return;
    }

    for (let c of comments) {
        commentsDiv.appendChild(createComment(c));
    }
}

function hideComments() {
    let commentsDiv = document.getElementById('comments_container');
    commentsDiv.parentNode.removeChild(commentsDiv);
}

function createComment(comment) {
    let commentDiv = document.createElement('div');
    commentDiv.classList.add('Box', 'Box--condensed');
    
    let commentHeaderDiv = document.createElement('div');
    commentHeaderDiv.classList.add('Box-header');

    let commentAuthorDiv = document.createElement('div');
    commentAuthorDiv.classList.add('Box-title', 'comment-title');

    let userImg = document.createElement('img');
    userImg.classList.add('comment-user-image');
    userImg.src = comment.image;

    commentAuthorDiv.appendChild(userImg);
    commentAuthorDiv.innerHTML = 
        commentAuthorDiv.innerHTML + comment.username;

    let commentBodyDiv = document.createElement('div');
    commentBodyDiv.classList.add('Box-body', 'markdown-body');
    commentBodyDiv.innerHTML = comment.body;

    commentHeaderDiv.appendChild(commentAuthorDiv);
    commentDiv.appendChild(commentHeaderDiv);
    commentDiv.appendChild(commentBodyDiv);

    return commentDiv;
}

function getAuth() {
    return {
        headers: {
            'Authorization': 'token ' + GITHUB_TOKEN
          }
    }
}