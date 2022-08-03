import React, { useEffect, useState } from 'react'
import '../style/Leaderboard.css'
import { useNavigate } from 'react-router'
import { Rank } from '../components/Rank'
import { getLeaderboard, getUsername, getUserRanking } from '../apiService'
export function Leaderboard() {
  const navigate = useNavigate()
  const username = getUsername()
  const [rankings, setRankings] = useState([])
  const [rank, setRank] = useState('?')

  useEffect(() => {
    getLeaderboard().then((res) => {
      setRankings(res.rankings)
    })
    getUserRanking(username).then((res) => {
      setRank(res.rank + 1)
    })
  }, [username])

  return (
    <div className={'leaderboard-page'}>
      <div className={'header'}>
        <img
          className={'back-icon clickable'}
          onClick={() => navigate(-1)}
          src={require('../assets/static/icons/back-icon.png')}
          alt={'back-icon'}
        />
      </div>
      <div className={'body'}>
        <div className={'title'}>leaderboard</div>
        <div className={'rankings'}>
          <Rank
            name={username}
            rank={rank}
            className={'orange-rank'}
            key={0}
            onPress={() =>
              navigate('/account', { state: { username: username } })
            }
          />
          {rankings.map((ranking) => (
            <Rank
              name={ranking.displayName}
              rank={ranking.rank + 1}
              key={ranking.rank + 1}
              className={'alternating-dark-rank'}
              onPress={() =>
                navigate('/account', {
                  state: { username: ranking.displayName },
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
