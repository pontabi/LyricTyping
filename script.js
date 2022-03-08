"use strict";

const article = `Lately, I've been, I've been thinking
I want you to be happier, I want you to be happier

When the morning comes
When we see what we've become
In the cold light of day, we're a flame in the wind
Not the fire that we've begun
Every argument, every word we can't take back
'Cause with all that has happened
I think that we both know the way that this story ends

Then only for a minute
I want to change my mind
'Cause this just don't feel right to me
I wanna raise your spirits
I want to see you smile but
Know that means I'll have to leave

Know that means I'll have to leave
Lately, I've been, I've been thinking
I want you to be happier, I want you to be happier

When the evening falls
And I'm left there with my thoughts
And the image of you being with someone else
Well, it's eating me up inside
But we ran our course, we pretended we're okay
Now if we jump together, at least we can swim
Far away from the wreck we made

Then only for a minute
I want to change my mind
'Cause this just don't feel right to me
I wanna raise your spirits
I want to see you smile but
Know that means I'll have to leave

Know that means I'll have to leave
Lately, I've been, I've been thinking
I want you to be happier, I want you to be happier

So I'll go, I'll go
I will go, go, go
So I'll go, I'll go
I will go, go, go

Lately, I've been, I've been thinking
I want you to be happier, I want you to be happier
Even though I might not like this
I think that you'll be happier, I want you to be happier

Then only for a minute (Only for a minute)
I want to change my mind
'Cause this just don't feel right to me (Right to me)
I wanna raise your spirits (Wanna raise your spirits)
I want to see you smile but
Know that means I'll have to leave

Know that means I'll have to leave
Lately, I've been, I've been thinking
I want you to be happier, I want you to be happier

So I'll go, I'll go
I will go, go, go`;

///////////////////////////////////////////////////////////
// VARIABLE INIT
let paragraphsPointer = 0;
let sentencesPointer = 0;
let charPointer = 0;

const lyricBoxEl = document.querySelector(".lyric-box");
const paragraphs = article.split("\n\n");
let paragraph = paragraphs[paragraphsPointer];
let sentences = paragraph.split("\n");

///////////////////////////////////////////////////////////
// RENDER LYRIC-BOX

///////////////////////////////////////////////////////////
//FUNCTIONS
const renderLyric = () => {
  paragraph = paragraphs[paragraphsPointer];
  sentences = paragraph.split("\n");
  while (lyricBoxEl.firstChild) {
    lyricBoxEl.removeChild(lyricBoxEl.firstChild);
  }
  sentences.forEach((sentence) => {
    const pEl = document.createElement("p");
    pEl.classList.add("lyric-paragraph");
    pEl.innerHTML = sentence;
    lyricBoxEl.appendChild(pEl);
  });
};

const updateParagraphsPointer = () => {
  if (paragraphsPointer < paragraphs.length - 1) {
    paragraphsPointer++;
    renderLyric();
  } else {
    console.log("Nice! Finish!");
    document.removeEventListener("keypress", keyDown);
  }
};

const updateSentencesPointer = () => {
  if (sentencesPointer < sentences.length - 1) {
    sentencesPointer++;
  } else {
    sentencesPointer = 0;
    updateParagraphsPointer(paragraphsPointer);
  }
};

const updateCharPointer = () => {
  if (charPointer < sentences[sentencesPointer].length - 1) {
    charPointer++;
  } else {
    charPointer = 0;
    updateSentencesPointer(sentencesPointer);
  }
};

// idxは次の文字のindex
const updateInnerHtml = () => {
  const text = sentences[sentencesPointer];
  const openSpanStr = "<span class='typed'>";
  const closeSpanStr = "</span>";
  const firstText = text.slice(0, charPointer + 1);
  const lastText = text.slice(charPointer + 1);
  return openSpanStr + firstText + closeSpanStr + lastText;
};

// console.log(updateInnerHtml(11, "hello world"));

///////////////////////////////////////////////////////////
// KEYDOWN EVENT
const keyDown = (e) => {
  const key = e.key;
  if (key === sentences[sentencesPointer][charPointer]) {
    console.log("key is valid");
    document.querySelector(
      `.lyric-paragraph:nth-child(${sentencesPointer + 1})`
    ).innerHTML = updateInnerHtml();
    updateCharPointer();
  } else {
    console.log("key is Invalid");
  }
};

document.addEventListener("keypress", keyDown);
renderLyric();
