import styled from 'styled-components'

const Outcome = styled.span`
  font-size: 8rem;
  color: ${props => props.win ? 'green' : 'red'}
`

function EndGame(winner) {
  if (winner === 'The Player') {
    return <Outcome win>YOU WIN</Outcome>
  }

  return <Outcome>GAME OVER</Outcome>
}

export { EndGame }