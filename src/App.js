import './App.css';
import React, {useState, useEffect} from 'react';
import Axios from "axios";
import { MapContainer, TileLayer, Circle, Tooltip } from 'react-leaflet';
import { useTable, useSortBy } from 'react-table'
import logo from './templates/rona.webp'

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )
  const firstPageRows = rows.slice(0, 200)

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} title="Ordenar">
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <i class="fas fa-sort-down"></i>
                        : <i class="fas fa-sort-up"></i>
                      : <i class="fas fa-sort"></i>}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')} </td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      <br />
    </>
  )
}

function App() {
  
  const[Dados, SetDados] = useState("");

  const[Carregando, SetCarregando] = useState(false);

  const buscaDados = async () =>{
    try{
      Axios.get("https://covid-dosvales.herokuapp.com/api/dados").then(
        (res) => {
          //console.log(res.data);
          SetDados(res.data);
        }
      )
      SetCarregando(true);
    } catch(e){
      <>
        <h1>O seguinte erro Ocorreu:</h1>
        <p>{e}</p>
      </>
    }
  }

  
  useEffect(() => {
    buscaDados();
  }, [])  
  const DadosFormatados = [...Dados]
  const columns = React.useMemo(
    () => [
      {
        Header: 'Cidade',
        accessor: 'nome',
      },
      {
        Header: 'Confirmados',
        accessor: 'confirmados',
      },
      {
        Header: 'Novos Casos',
        accessor: 'novosconfirmados',
      },
      {
        Header: 'Incidência',
        accessor: 'incidencia',
      },
      {
        Header: 'Óbitos',
        accessor: 'obitos',
      },
      {
        Header: 'Novos Óbitos',
        accessor: 'novosobitos',
      },
      {
        Header: 'Mortalidade',
        accessor: 'mortalidade',
      },
    ],
    []
    )
    
    const data = DadosFormatados
    return (
    <div className="reactapp">
    <header>
    <h1><img className='logo' src={logo} alt="Logo"></img>COVID - Santa Cruz do Sul e Região.</h1>
    </header>
    <div className="App">
      <div className="wrapper">
      <MapContainer className='mapcontainer' center={[-29.7141869, -52.4285914]} zoom={9} scrollWheelZoom={true}>
        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {/*Arroio do Meio */}
        <Circle center={[-29.4020392, -51.9444993]} pathOptions={{color : 'red'}} radius={3400}> 
        <Tooltip sticky>{DadosFormatados.slice(0,1).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Cachoeria do Sul */}
        <Circle center={[-30.0474778, -52.8905413]} pathOptions={{color : 'red'}} radius={2000}> 
        <Tooltip sticky>{DadosFormatados.slice(1,2).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Candelária*/}
        <Circle center={[-29.668391, -52.789495]} pathOptions={{color : 'red'}} radius={2000}> 
        <Tooltip sticky>{DadosFormatados.slice(2,3).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Lajeado*/}
        <Circle center={[-29.4671522, -51.9624046]} pathOptions={{color : 'red'}} radius={4000}> 
        <Tooltip sticky>{DadosFormatados.slice(3,4).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Passo do Sobrado*/}
        <Circle center={[-29.7477243, -52.2734293]} pathOptions={{color : 'red'}} radius={1300}> 
        <Tooltip sticky>{DadosFormatados.slice(4,5).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Rio Pardo*/}
        <Circle center={[-29.9820554,-52.3702447]} pathOptions={{color : 'red'}} radius={1300}> 
        <Tooltip sticky>{DadosFormatados.slice(5,6).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Santa Cruz do Sul*/}
        <Circle center={[-29.7141869,-52.4285914]} pathOptions={{color : 'red'}} radius={3000}> 
        <Tooltip sticky>{DadosFormatados.slice(6,7).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Sinimbu*/}
        <Circle center={[-29.5346879,-52.5199906]} pathOptions={{color : 'red'}} radius={2000}> 
        <Tooltip sticky>{DadosFormatados.slice(7,8).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Sobradinho*/}
        <Circle center={[-29.4131826,-53.0256794]} pathOptions={{color : 'red'}} radius={2300}> 
        <Tooltip sticky>{DadosFormatados.slice(8,9).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Taquari*/}
        <Circle center={[-29.79433,-51.865346]} pathOptions={{color : 'red'}} radius={3800}> 
        <Tooltip sticky>{DadosFormatados.slice(9,10).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Vale do Sol*/}
        <Circle center={[-29.6036459,-52.6867334]} pathOptions={{color : 'red'}} radius={2000}> 
        <Tooltip sticky>{DadosFormatados.slice(10,11).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Vale Verde*/}
        <Circle center={[-29.7830651,-52.1843582]} pathOptions={{color : 'red'}} radius={2000}> 
        <Tooltip sticky>{DadosFormatados.slice(11,12).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Venâncio Aires*/}
        <Circle center={[-29.614306,-52.193159]} pathOptions={{color : 'red'}} radius={3800}> 
        <Tooltip sticky>{DadosFormatados.slice(12,13).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
        {/*Vera Cruz*/}
        <Circle center={[-29.714827599827537, -52.50212825755918]} pathOptions={{color : 'red'}} radius={2000}> 
        <Tooltip sticky>{DadosFormatados.slice(13,14).map(cidade => ([<strong>{cidade.nome}</strong>, <br/>,'Incidência /100mil: ', cidade.incidencia, <br/>,'Casos Confirmados: ' +cidade.confirmados,<br/>,'Novos Casos: ' , cidade.novosconfirmados , <br/>,'Óbitos: ', cidade.obitos, <br/>, 'Novos Óbitos: ',  cidade.novosobitos, <br/>,'Mortalidade /100mil: ', cidade.mortalidade]))}</Tooltip>
        </Circle>
      </MapContainer>
          {Carregando ? 
          <>
          <div className="info"><i className="fas fa-info-circle"></i></div>
    <div className="hideDesc">*Incidência de infecção e Mortalidade são resultados gerados a partir de uma evaluação por 100 mil habitantes.</div>
          <Table columns={columns} data={data}></Table>
          <footer>
    <div className="about">
            <h1>Sobre</h1>
            <p className="text-justify">API criada por <a className="github" href="https://github.com/Bruno-Viana" target="_blank" rel="noreferrer">@Bruno Viana</a> em Q1 de 2021. Todos os dados retirados da Secretaria da Saúde do Rio Grande do Sul.<br/>
            Copyright © 2021 Bruno-Viana. Todos os direitos reservados.</p>
        </div>
    <div className="test">
        <h1 >Aviso</h1>
        <p>Website não governamental feito apenas com intenções educativas.<br/>
        Para mais informações sobre COVID: <a href="https://saude.rs.gov.br/inicial" target="_blank" rel="noreferrer">Secretaria da Saúde</a></p>
    </div>
    <div className="social">
        <ul className="social-icons">
        <h1>GitHub</h1>
          <a className="github" href="https://github.com/Bruno-Viana" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
        </ul>
    </div>
    </footer>
          </>
          :(<h1>Carregando...</h1>)}
      </div>
    </div>
    </div>
  );
}

export default App;
