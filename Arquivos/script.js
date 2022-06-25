//objetos
let objCanvas = null
let objContexto = null

//variaveis do jogo
let areaArvores = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
let pontuacao = 0 //chega até 182
let pontoMax = 40
let fase = 1
let maior = pontuacao

let heroi = {
    x: 32,
    y: 32,
    img: new Image()
}
let monstro1 = {
    x: (parseInt(Math.random() * 10) * 32) + 64,
    y: (parseInt(Math.random() * 10) * 32) + 64,
    img: new Image()
}
let monstro2 = {
    x: (parseInt(Math.random() * 10) * 32) + 64,
    y: (parseInt(Math.random() * 10) * 32) + 64,
    img: new Image()
}

let area = { //area de 14 x 13 "chunks"
    x: 32,
    y: 32,
    xf: 480,
    yf: 448,
    l: 448,
    h: 416
}

//Aqui ficam as imagens
let imgFundo = new Image()
imgFundo.src = "./Img/fundo.png"
let imgArv = new Image()
imgArv.src = "./Img/arvore.png"
let imgArv2 = new Image()
imgArv2.src = "./Img/arvore2.png"
let imgGanhar = new Image()
imgGanhar.src = "./Img/Parabens.jpg"

heroi.img.src = "./Img/heroi.png"
monstro1.img.src = "./Img/monstro.png"
monstro2.img.src = "./Img/monstro.png"
//fim das imagens

//Inicia o jogo
function Iniciar() {
    objCanvas = document.getElementById('meuCanvas')
    objContexto = objCanvas.getContext('2d')

    AtualizarTela()
}
//Reinicia a faze
function ReIniciar() {
    for (let y = 0; y <= 12; y++) { //Retira todas as árvores da tela
        for (let x = 0; x <= 13; x++) {
            areaArvores[y][x] = 0
        }
    }
    pontuacao = 0

    heroi.x = 32
    heroi.y = 32
    //Da novas posições iniciais para os monstros
    monstro1.x = (parseInt(Math.random() * 10) * 32) + 64
    monstro1.y = (parseInt(Math.random() * 10) * 32) + 64
    monstro2.x = (parseInt(Math.random() * 10) * 32) + 64
    monstro2.y = (parseInt(Math.random() * 10) * 32) + 64

    Iniciar()
}
//Reinicia o jogo
function ReIniciarTotal() {
    for (let y = 0; y <= 12; y++) { //Retira todas as árvores da tela
        for (let x = 0; x <= 13; x++) {
            areaArvores[y][x] = 0
        }
    }
    pontuacao = 0
    fase = 1
    pontoMax = 40

    heroi.x = 32
    heroi.y = 32
    //Da novas posições iniciais para os monstros
    monstro1.x = (parseInt(Math.random() * 10) * 32) + 64
    monstro1.y = (parseInt(Math.random() * 10) * 32) + 64
    monstro2.x = (parseInt(Math.random() * 10) * 32) + 64
    monstro2.y = (parseInt(Math.random() * 10) * 32) + 64

    Iniciar()
}

//Atualiza o jogo a cada passo dado
function AtualizarTela() {
    if (fase < 7) {
    if (pontuacao < pontoMax) {
    //Cenário
    objContexto.drawImage(imgFundo, 0, 0)
    for (let y = 0; y <= 12; y++) {
        for (let x = 0; x <= 13; x++) {
            switch (areaArvores[y][x]) {
                case 1:
                objContexto.drawImage(imgArv, (x + 1) * 32, (y + 1) *32)
                break
                
                case 2:
                objContexto.drawImage(imgArv2, (x + 1) * 32, (y + 1) *32)
                break
            }
        }
    }

    //Personagens
    objContexto.drawImage(heroi.img, heroi.x, heroi.y)
    objContexto.drawImage(monstro1.img, monstro1.x, monstro1.y)
    if (fase >= 3)
        objContexto.drawImage(monstro2.img, monstro2.x, monstro2.y)

    //Pontuação e fase
    objContexto.fillStyle = "white"
    objContexto.font = "20pt Arial"
    objContexto.fillText(`Pontuação: ${pontuacao}`, 10, 24)
    objContexto.fillText(`Recorde: ${maior}`, 300, 24)
    objContexto.fillText(`Fase ${fase}`, 420, 470)
    objContexto.font = "15pt Arial"
    objContexto.fillText(`Objetivo: ${pontoMax}`, 10, 470)

    }
    else { //Quando o jogador atinge a pontuação máxima
        objContexto.drawImage(imgGanhar, 0, 0)
        if (pontoMax < 180) {
            pontoMax += 20
            fase++
        }
        else
            pontoMax = 182
        ReIniciar()
    }
}
    else {
        objContexto.drawImage(imgGanhar, 0, 0)
    }

}


//Funcões do monstro
function MexerAleatorioMonstro(monstro) {
    let d = parseInt((Math.random() * 10) % 4)

    switch (d) {
        case 0:
            monstro.x -= 32
            break
        case 1: 
            monstro.x += 32
            break
        case 2:
            monstro.y += 32
            break
        case 3:
            monstro.y -= 32
            break    
    }

    ColisaoParedeMapa(monstro)
}

function MexerMonstro(monstro) {
    let x = monstro.x / 32 - 1
    let y = monstro.y / 32 - 1
    let xPerto = 0
    let yPerto = 0

    for (let yv = 0; yv <= 12; yv++) { //Acha a árvore mais perto
        for (let xv = 0; xv <= 13; xv++) {
            /*
            if (xv < x) {
                if (x - xv < x - xPerto)
                    xPerto = xv
                if (y - yv < y - yPerto)
                    yPerto = yv
            }
            else if (xv > x) {
                if (xPerto < x) {
                    if (xv - x < x - xPerto)
                        xPerto = xv
                }
                else {
                    if (xv - x < xPerto - x)
                        xPerto = xv
                }

                if (yPerto < x) {
                    if (yv - y < y - yPerto)
                        yPerto = yv
                }
                else {

                }
            }
            */
        }
    }
}
//Fim do monstro

//Funções do heroi
document.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 87:
        heroi.y -= 32
        TeclaApertada()
        break

        case 83:
        heroi.y += 32
        TeclaApertada()
        break

        case 68:
        heroi.x += 32
        TeclaApertada()
        break

        case 65:
        heroi.x -= 32
        TeclaApertada()
        break

        case 32:
        PlantarArvore(heroi.x, heroi.y)
        AtualizarTela()
        break
    }
})

function TeclaApertada() {
    ColisaoParedeMapa(heroi)

    MexerAleatorioMonstro(monstro1)
    RetirarArvore(monstro1)
    if (fase >= 3) {
        MexerAleatorioMonstro(monstro2)
        RetirarArvore(monstro2)
    }

    AtualizarTela()            
}
//Fim do heroi

//Colisões
function ColisaoParedeMapa(obj) {
    if (obj.x >= area.xf) {
        obj.x = area.l
    }
    else if (obj.x <= area.x) {
        obj.x = area.x
    }

    if (obj.y >= area.yf) {
        obj.y = area.h
    }
    else if (obj.y <= area.y) {
        obj.y = area.y
    }
}
//Fim das colisões

//Funções do jogo
function PlantarArvore(x, y) {
    for (let yv = 0; yv <= 12; yv++) {
        for (let xv = 0; xv <= 13; xv++) {
            if (x == ((xv + 1) * 32) && y == ((yv + 1) * 32) && areaArvores[yv][xv] == 0) { //verifica se a posição do heroi é a mesma do vetor
                let arv = parseInt(Math.random() * 10 % 2) + 1
                areaArvores[yv][xv] = arv

                pontuacao++
                if (pontuacao > maior)
                    maior = pontuacao
            }
        }
    }
}

function RetirarArvore(m) {
    for (let yv = 0; yv <= 12; yv++) {
        for (let xv = 0; xv <= 13; xv++) {
            if (m.x == ((xv + 1) * 32) && m.y == ((yv + 1) * 32) && (areaArvores[yv][xv] == 1 || areaArvores[yv][xv] == 2)) { //verifica se a posição do monstro é a mesma do vetor
                areaArvores[yv][xv] = 0
                pontuacao--
            }
        }
    }
}