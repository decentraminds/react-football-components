import React, { useEffect } from 'react';

const URL = 'https://raw.githubusercontent.com/Drarig29/brackets-viewer.js/master/demo/db.json';

async function render(bandera, dataLoad) {
  let data = {}
  if(bandera)
    data = await fetch(URL).then(res => res.json());
  else
    data = dataLoad;

  window.bracketsViewer.render({
      stages: data.stage,
      matches: data.match,
      matchGames: data.match_game,
      participants: data.participant,
  }, {
      selector: '#idviewer',
      participantOriginPlacement: 'before',
      separatedChildCountLabel: true,
      showSlotsOrigin: true,
      showLowerBracketSlotsOrigin: true,
      highlightParticipantOnHover: true,
  }).then(
      () => console.log('Render finished')
  );

  window.bracketsViewer.onMatchClicked = async (matchObjeto) => {
    console.log(matchObjeto)
    const idPosicionSeleccionadaString = document.querySelector(`[data-match-id="${matchObjeto.id}"] .opponents .name > span`).textContent.replace('#', '');
    let idPosicionSeleccionadaNumber = Number(idPosicionSeleccionadaString)
    if(idPosicionSeleccionadaNumber === matchObjeto.opponent1.position){
      matchObjeto.opponent1.result = 'win'
      matchObjeto.opponent2.result = 'loss'
    }
    if(idPosicionSeleccionadaNumber === matchObjeto.opponent2.position){
      matchObjeto.opponent2.result = 'win'
      matchObjeto.opponent1.result = 'loss'
    }
    const dataL = await fetch(URL).then(res => res.json());
    await window.bracketsManager.import(dataL);
    await window.bracketsManager.update.match(
      {
        id: matchObjeto.id,
        opponent1: matchObjeto.opponent1,
        opponent2: matchObjeto.opponent2,
      }
    );
    const newData = await window.bracketsManager.export();
    console.log(newData);
    await render(false, newData)
  }

}

function App() {
  useEffect(() => {
    render(true, {});
  }, []);
  
  return <div id="idviewer"  className="brackets-viewer"></div>
}

export default App;