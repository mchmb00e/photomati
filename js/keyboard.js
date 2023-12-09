const keyboard = {
    'matrix': `<div class="keyboard">
    <div class="key" onclick="keyPress('1')" style="grid-row: 5 / 6; grid-column: 1 / 2;">1</div>
    <div class="key" onclick="keyPress('2')" style="grid-row: 5 / 6; grid-column: 2 / 3;">2</div>
    <div class="key" onclick="keyPress('3')" style="grid-row: 5 / 6; grid-column: 3 / 4;">3</div>
    <div class="key" onclick="keyPress('4')" style="grid-row: 4 / 5; grid-column: 1 / 2;">4</div>
    <div class="key" onclick="keyPress('5')" style="grid-row: 4 / 5; grid-column: 2 / 3;">5</div>
    <div class="key" onclick="keyPress('6')" style="grid-row: 4 / 5; grid-column: 3 / 4;">6</div>
    <div class="key" onclick="keyPress('7')" style="grid-row: 3 / 4; grid-column: 1 / 2;">7</div>
    <div class="key" onclick="keyPress('8')" style="grid-row: 3 / 4; grid-column: 2 / 3;">8</div>
    <div class="key" onclick="keyPress('9')" style="grid-row: 3 / 4; grid-column: 3 / 4;">9</div>
    <div class="key" onclick="keyPress('0')" style="grid-row: 6 / 7; grid-column: 1 / 3;">0</div>
    <div class="key red-btn" onclick="keyPress('left')" style="grid-row: 2 / 3; grid-column: 1 / 3;"><svg
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-caret-left-fill"
        viewBox="0 0 16 16">
        <path
          d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
      </svg></div>
    <div class="key red-btn" onclick="keyPress('right')" style="grid-row: 2 / 3; grid-column: 4 / 6;"><svg
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-caret-right-fill"
        viewBox="0 0 16 16">
        <path
          d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
      </svg></div>
    <div class="key red-btn" onclick="keyPress('up')" style="grid-row: 1 / 2; grid-column: 3 / 4;"><svg
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-caret-up-fill"
        viewBox="0 0 16 16">
        <path
          d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
      </svg></div>
    <div class="key red-btn" onclick="keyPress('down')" style="grid-row: 2 / 3; grid-column: 3 / 4;"><svg
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-caret-down-fill"
        viewBox="0 0 16 16">
        <path
          d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      </svg></div>
    <div class="key" onclick="keyPress('reset')" style="grid-row: 5 / 7; grid-column: 4 / 6;"><svg
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
        <path
          d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
      </svg>Vaciar celda</div>
    <div class="key" onclick="keyPress('/')" style="grid-row: 6 / 7; grid-column: 3 / 4;">/</div>
    <div class="key" onclick="keyPress('delete')" style="grid-row: 3 / 4; grid-column: 4 / 6;">Borrar</div>
    <div class="key" onclick="keyPress('-')" style="grid-row: 4 / 5; grid-column: 4 / 6;">Negativo</div>
    <div class="key" id="gauss-jordan-btn" onclick="keyPress('gaussJordan')"
      style="grid-row: 1 / 2; grid-column: 1 / 3;">Escalonar y rango
    </div>
    <div class="key" id="reverse-btn" onclick="keyPress('reverse')" style="grid-row: 1 / 2; grid-column: 4 / 6;">
      Inversa</div>
  </div>`,
    'system': `<div class="keyboard">
    <div class="key" onclick="keyPress('1')" style="grid-row: 5 / 6; grid-column: 1 / 2;">1</div>
    <div class="key" onclick="keyPress('2')" style="grid-row: 5 / 6; grid-column: 2 / 3;">2</div>
    <div class="key" onclick="keyPress('3')" style="grid-row: 5 / 6; grid-column: 3 / 4;">3</div>
    <div class="key" onclick="keyPress('4')" style="grid-row: 4 / 5; grid-column: 1 / 2;">4</div>
    <div class="key" onclick="keyPress('5')" style="grid-row: 4 / 5; grid-column: 2 / 3;">5</div>
    <div class="key" onclick="keyPress('6')" style="grid-row: 4 / 5; grid-column: 3 / 4;">6</div>
    <div class="key" onclick="keyPress('7')" style="grid-row: 3 / 4; grid-column: 1 / 2;">7</div>
    <div class="key" onclick="keyPress('8')" style="grid-row: 3 / 4; grid-column: 2 / 3;">8</div>
    <div class="key" onclick="keyPress('9')" style="grid-row: 3 / 4; grid-column: 3 / 4;">9</div>
    <div class="key" onclick="keyPress('0')" style="grid-row: 6 / 7; grid-column: 1 / 3;">0</div>
    <div class="key red-btn" onclick="keyPress('left')" style="grid-row: 2 / 3; grid-column: 1 / 3;"><svg
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-caret-left-fill"
        viewBox="0 0 16 16">
        <path
          d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
      </svg></div>
    <div class="key red-btn" onclick="keyPress('right')" style="grid-row: 2 / 3; grid-column: 4 / 6;"><svg
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-caret-right-fill"
        viewBox="0 0 16 16">
        <path
          d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
      </svg></div>
    <div class="key red-btn" onclick="keyPress('up')" style="grid-row: 1 / 2; grid-column: 3 / 4;"><svg
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-caret-up-fill"
        viewBox="0 0 16 16">
        <path
          d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
      </svg></div>
    <div class="key red-btn" onclick="keyPress('down')" style="grid-row: 2 / 3; grid-column: 3 / 4;"><svg
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-caret-down-fill"
        viewBox="0 0 16 16">
        <path
          d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      </svg></div>
    <div class="key" onclick="keyPress('reset')" style="grid-row: 5 / 7; grid-column: 4 / 6;"><svg
        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
        <path
          d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
      </svg>Vaciar celda</div>
    <div class="key" onclick="keyPress('/')" style="grid-row: 6 / 7; grid-column: 3 / 4;">/</div>
    <div class="key" onclick="keyPress('delete')" style="grid-row: 3 / 4; grid-column: 4 / 6;">Borrar</div>
    <div class="key" onclick="keyPress('-')" style="grid-row: 4 / 5; grid-column: 4 / 6;">Negativo</div>
    <div class="key" onclick="keyPress('system-answer')"
      style="grid-row: 1 / 2; grid-column: 1 / 3;">Resultado
    </div>
    <div class="key" id="reverse-btn" onclick="keyPress('reverse')" style="grid-row: 1 / 2; grid-column: 4 / 6;">
      Inversa</div>
  </div>`
}