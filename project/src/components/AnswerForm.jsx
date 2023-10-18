import InputCustom from './InputCustom';

const AnswerForm = ({ taskCase, setTaskCase }) => {
  const handleAddCase = () => {
    setTaskCase((prev) => [...prev, { args: '', result: '' }]);
  };

  const handleChangeTaskCase = (key, event) => {
    const { name, value } = event.target;
    const copiedCases = [...taskCase];
    copiedCases[key][name] = value;

    setTaskCase(copiedCases);
  };

  return (
    <>
      {taskCase.map((taskCase, index) => (
        <div style={{ display: 'flex' }}>
          <InputCustom
            key={index}
            value={taskCase.args}
            onChange={(e) => handleChangeTaskCase(index, e)}
            name='args'
            label='Аргумент'
            isCase
          />
          <InputCustom
            key={index + 1}
            value={taskCase.result}
            onChange={(e) => handleChangeTaskCase(index, e)}
            name='result'
            label='Результат'
            isCase
          />
        </div>
      ))}
      <button
        style={{ display: 'block', margin: '24px auto ' }}
        type='button'
        onClick={handleAddCase}
      >
        Add
      </button>
    </>
  );
};

export default AnswerForm;
