import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Layout from './layout'
import Loader from '../components/Loader'
import { UserContext } from '../context/UserContext'

interface Task {
  id: number
  title: string
  description: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const {user} = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      try {


        if (user) {
          const resp = await axios.get('https://localhost:8000/api/tasks', {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          })

          if (resp.status === 401){

            console.log('response unauthorized :',resp.status)
          }

          setTasks(resp.data['hydra:member'])
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    if (loading) {
      fetchData()
    }
  }, [loading, user])

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-500">
        Integrate Symfony API
      </h1>
      <div className="card">
        {tasks.length <= 0 ? (
          <div>No tasks found</div>
        ) : (
          <>
            {tasks.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {tasks.map((task) => (
                  <li
                    className="flex text-xl text-gray p-4 border border-gray rounded-lg "
                    key={task.id}
                  >
                    <p className="font-bold flex">
                      <span className="mr-2">{task.id}</span>
                      {task.title}:
                    </p>
                    <p className="ml-2">{task.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <Loader />
            )}
          </>
        )}
      </div>
    </Layout>
  )
}
