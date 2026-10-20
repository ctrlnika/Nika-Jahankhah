async function updateListening() {
 const card = document.querySelector('.spotify-card'); if (!card || document.hidden) return;
 try {
  const response = await fetch('/api/spotify'); const data = await response.json();
  if(!response.ok || !data.configured) return;
  const texts = card.querySelectorAll('p');
  texts[0].textContent = data.isPlaying ? 'Listening now' : data.playedAt ? 'Last listened' : 'On Spotify';
  texts[1].textContent = data.title || 'My Spotify profile'; texts[2].textContent = data.artist || '';
  if(data.url?.startsWith('https://open.spotify.com/')) card.href = data.url;
  if(data.albumArt?.startsWith('https://')) { const img = document.createElement('img'); img.src=data.albumArt;img.alt='';img.className='size-full object-cover';card.firstElementChild.replaceChildren(img); }
 } catch { /* Keep the working profile link when Spotify is unavailable. */ }
}
updateListening(); setInterval(updateListening,60000); document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateListening();});
