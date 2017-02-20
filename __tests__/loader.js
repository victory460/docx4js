const zipDoc=require("../src/document")
const openxml=require("../src/openxml/document")

describe("loader", function(){
    var loader=`${__dirname}/files/loader`

	it("can load any zip", function(){
		return zipDoc.load(`${loader}.zip`).then(doc=>{
			expect(!!doc.render).toBe(true)
		})
	})

	fit("parsed xml with id, without line-feed text node", function(){
		const content=`
		<a>hello</a>
		`
		let doc=new zipDoc({
				content:{
					asText(){
						return content
					}
				},
				trimed: {
					asText(){
						return content.trim()
					}
				}
			})
		expect(doc.getObjectPart("content").root().length)
			.toBe(doc.getObjectPart("trimed").root().length)

		let root=doc.getObjectPart("content").root().get(0)
		expect(root.children.length).toBe(1)
	})

    fit("can be cloned", function(){
        return openxml.load(`${loader}.docx`).then(docx=>{
            let cloned=docx.clone()
            expect(cloned instanceof openxml).toBe(true)
        })
    })


    describe("openxml", function(){
        const check=doc=>{
            expect(!!doc.main).toBe(true)
            expect(!!doc.officeDocument).toBe(true)
        }
        it("can load docx", function(){
            return openxml.load(`${loader}.docx`).then(check)
        })

        it("can load xslx", function(){
            return openxml.load(`${loader}.xlsx`).then(check)
        })

        it("can load pptx", function(){
            return openxml.load(`${loader}.pptx`).then(check)
        })
    })


})
