import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { getTask, executeTask } from '../../API'
import CodeEditor from '@uiw/react-textarea-code-editor';
import Select from 'react-select'
import { UserContext } from './../../common/UserContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const MySwall = withReactContent(Swal)

function Task({ taskSlug, preloadedTask }) {
    const userContext = useContext(UserContext)
    const [showTests, setShowTests] = useState(false)
    const [testResults, setTestResults] = useState()
    const { handle } = useParams()
    
    // We prioritize the slug we recieve in props over the slug in the URL
    const [slug, setSlug] = useState(taskSlug === undefined ? handle : taskSlug)

    const [task, setTask] = useState([]);

    useEffect(() => {
        // But we give even higher priority to a task if it is directly passed as a prop
        if (preloadedTask !== undefined) {
            setTask(preloadedTask);
            setSlug(preloadedTask.slug)
            return;
        }

        (async () => {
            try {
                const res = await getTask(slug)

                if (res.success) {
                    setTask(res.data)
                } else {
                    // TODO: Error handle
                    // let mock = []

                    // for (var i = 0; i < 20; i++) {
                    //     mock.push({
                    //         name_last_name: 'marko markic', task_name: 'zadatak', max_exe_time: '2.4',
                    //         slug: 'zadatak', task_text: 'tekst tekst tekst tekst', difficulty: '1'
                    //     })
                    // }

                    // setTask(mock)
                }
            } catch (err) {
                console.log(err)
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleRunAndSave(lang, code) {
        const username = userContext.user.username
        console.log(slug)
        const executeTaskData = {
            "slug": slug,
            "username": username,
            "lang": lang,
            "code": code
        };

        (async () => {
            try {
                const res = await executeTask(executeTaskData)
                setShowTests(true)

                if (res.success) {
                    MySwall.fire({
                        title: <p>Success</p>,
                        html: <p>{res.data.result}</p>
                    })

                    setTestResults(res.data.tests)
                } else {
                    MySwall.fire({
                        title: <p>Error</p>,
                        html: <p>Could not run tests!</p>
                    })
                }
            } catch (err) {
                console.log(err)
            }
        })();
    }

    const [code, setCode] = React.useState(
        `function add(a, b) {\n  return a + b;\n}`
    );

    const options = [
        { value: 'py3', label: 'Python' },
        { value: 'c', label: 'C' },
        { value: 'cpp', label: 'C++' }
    ]

    const [state, setState] = React.useState(
        'py3'
    );

    return (
        <div className="m-4">
            <div className="py-2">
                <h3>{task.task_name}</h3>
                <p>{task.task_text}</p>
                <div><b>Author:</b> {task.name_last_name}</div>
                <div><b>Compile time limit: </b>{task.max_exe_time} sec</div>
                <div><b>Difficulty: </b>{task.difficulty}/5</div>
            </div>
            <div className="row">
                <div className="col-12 mb-2">
                    <Select options={options}
                        className="basic-single float-end"
                        defaultValue={options[0]}
                        onChange={(evn) => setState(evn.value)}
                    />
                </div>
                <div className="col-12">
                    <CodeEditor
                        language={state}
                        placeholder="Please enter your code."
                        onChange={(evn) => setCode(evn.target.value)}
                        padding={15}
                        style={{
                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            // marginLeft: 190,
                            // marginRight: 190,
                            // marginTop: 50,
                            // marginBottom: 10,
                            minHeight: 400,
                        }}
                    />
                </div>
            </div>

            <button className='btn btn-info btn-dark rounded-0 btn-cta px-2 float-end mt-2'
                onClick={(e) => handleRunAndSave(state, code)}>
                Run and save!
            </button>
            {
                showTests ? (
                    <div style={{ marginLeft: 220, marginRight: 220, marginTop: 70, marginBottom: 50 }}>
                        <h2>Result: 100%</h2>
                        <table className="table table-striped table-hover competition-table">
                            <thead>
                            </thead>
                            <tbody>
                                {testResults && Object.entries(testResults).map(([key, {description, passed}]) =>
                                    <tr key={key}>
                                        <td>#{Number(key) + 1}</td>
                                        <td className={passed ? "text-success" : "text-danger"}>{passed ? "OK" : "Failed"}</td>
                                        <td>{description}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <h3 style={{ color: 'white' }}>-</h3>
                    </div>
                ) : (<div></div>)
            }
        </div>

    );

}

export default Task;