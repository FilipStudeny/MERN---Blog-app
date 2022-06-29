
import '../styles/form.css'


const CreateNewPost = () => {
  return (
    <div className='form_container'>
        <form className='form'>
          <input className='input_title' type={'text'} placeholder={'Title'} />
          <textarea className='input_textArea' placeholder={'Description'} />
          <span>
          <input className='input_file' type={'file'} placeholder={''}/>
          </span>
          <button type={'submit'}>Create new post</button>
        </form>
    </div>
  )
}

export default CreateNewPost