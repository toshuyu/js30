describe('fetchUserData', () => {
    it('should return user data when userId exists', (done) => {
        fetchUserData(1, (err, userData) => {
            expect(err).toBeNull();
            expect(userData).toEqual({ name: 'John Doe', age: 30 });
            done();
        });
    });

    it('should return error when userId does not exist', (done) => {
            fetchUserData(3, (err, userData) => {
                expect(err).toEqual(new Error('Usr not found'));
                expect(userData).toBeUndefined();
                done();
            });
        });
    });

    describe('getUserData', () => {
        it('should return user data when userId exists', async () => {
            const userData = await getUserData(1);
            expect(userData).toEqual({ name: 'John Doe', age: 30 });
        });
    
        it('should return error when userId does not exist', async () => {
            await expect(getUserData(3)).rejects.toThrow('Usr not found');
        });
    });