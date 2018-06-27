process.env.NODE_ENV = 'test';

const chai = require('chai');
const ratings = require('../lib/ratings')
const {pool} = require('../index')

let should = chai.should()

describe('Rating Utils', () => {

    describe('function updateContentAverageRating()', () => {

        it('it should update the contents average_rating', done => {
            let initialAverage = null
            pool.query(`SELECT average_rating FROM contents WHERE id = 2`, (err, res) => {
                if (err) {
                    expect(false, `Couldn't get average_rating of contentId: 2, check testdb schema`).to.be.ok;
                    done()
                    return
                }

                initialAverage = res.rows[0].average_rating
                initialAverage
                    .should
                    .eql(3)
                pool.query(`
                    INSERT INTO ratings (user_ID, content_ID, rating) VALUES (1, 2, 5);
                    INSERT INTO ratings (user_ID, content_ID, rating) VALUES (1, 2, 4);
                `, (err, res) => {
                    if (err) {
                        expect(false, `Couldn't insert tuples into table: ratings, check testdb schema`).to.be.ok;
                        done()
                        return
                    } 
                    ratings.updateContentAverageRating(pool, 2)
                    setTimeout(() => {
                        pool.query(`SELECT average_rating FROM contents WHERE id = 2`, (err, res) => {
                            if (err) {
                                expect(false, `Couldn't get average_rating of contentId: 2, check testdb schema`).to.be.ok;
                                done()
                                return
                            }
                            (res.rows[0].average_rating)
                                .should
                                .eql(3.75)
                            done()
                            
                        })
                    }, 100)
                    
                })
                
            })
        })
    })
})
