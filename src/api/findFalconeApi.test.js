import findFalconeApi from './findFalconeApi';

describe('Test Find Falcone API', () => {
  it('fetches expected planets data from an API', async () => {
    const data = await findFalconeApi({
      path: 'planets',
      requestType: 'GET',
    });

    expect(data.length).toBeGreaterThan(0);

    data.forEach(({ name, distance }) => {
      expect(typeof name).toEqual('string');
      expect(typeof distance).toEqual('number');
    });
  });

  it('fetches expected vehicles data from an API', async () => {
    const data = await findFalconeApi({
      path: 'vehicles',
      requestType: 'GET',
    });

    expect(data.length).toBeGreaterThan(0);

    data.forEach(({ name, total_no, max_distance, speed }) => {
      expect(typeof name).toEqual('string');
      expect(typeof total_no).toEqual('number');
      expect(typeof max_distance).toEqual('number');
      expect(typeof speed).toEqual('number');
    });
  });

  it('returns an empty array on a failed request', async () => {
    const data = await findFalconeApi({
      path: 'this is not a recognised path',
      requestType: 'GET',
    });

    expect(Array.isArray(data)).toEqual(true);
    expect(data.length).toEqual(0);
  });

  it('recieves a response status when posting planet and vehicles data ', async () => {
    const data = await findFalconeApi({
      path: 'find',
      requestType: 'POST',
      requestBody: {
        planet_names: ['Donlon', 'Enchai', 'Pingasor', 'Sapir'],
        vehicle_names: [
          'Space pod',
          'Space rocket',
          'Space rocket',
          'Space rocket',
        ],
      },
    });

    expect(data.status).toEqual('success' || 'false');
  });
});
