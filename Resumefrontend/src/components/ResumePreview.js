import { forwardRef } from "react"
import { DocumentArrowDownIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import { templates, colorSchemes, fonts } from "./libs/constants"

export const ResumePreview = forwardRef(
  (
    {
      data,
      template,
      colorScheme,
      font,
      layout,
      darkMode,
      setActiveTemplate,
      setColorScheme,
      setFont,
      setLayout,
      setDarkMode,
      handleExportPDF,
      handleExportDOCX,
      handleExportPNG,
    },
    ref,
  ) => {
    const TemplateComponent = templates[template]

    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Resume Preview</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Template</label>
              <select
                value={template}
                onChange={(e) => setActiveTemplate(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {Object.keys(templates).map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color Scheme</label>
              <select
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {Object.keys(colorSchemes).map((scheme) => (
                  <option key={scheme} value={scheme}>
                    {scheme.split(/(?=[A-Z])/).join(" ")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font</label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {fonts.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Layout</label>
              <select
                value={layout}
                onChange={(e) => setLayout(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="single">Single Column</option>
                <option value="two">Two Columns</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              {darkMode ? <SunIcon className="h-5 w-5 mr-2" /> : <MoonIcon className="h-5 w-5 mr-2" />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button
              onClick={handleExportPDF}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              PDF
            </button>

            <button
              onClick={handleExportDOCX}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              DOCX
            </button>

            <button
              onClick={handleExportPNG}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              PNG
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
          <div
            ref={ref}
            className={`bg-white shadow-lg rounded-lg overflow-hidden ${darkMode ? "dark" : ""}`}
            style={{
              width: "210mm",
              minHeight: "297mm",
              margin: "0 auto",
              padding: "20mm",
            }}
          >
            <TemplateComponent data={data} colorScheme={colorSchemes[colorScheme]} font={font} layout={layout} />
          </div>
        </div>
      </div>
    )
  },
)

ResumePreview.displayName = "ResumePreview"

