import * as changeCase from "change-case";
import { writeFile } from "fs";

export function indexTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/index.dart`;
  const template = `library ${snakeCaseName};

export './page.dart';
export './vm.dart';
`;

  return new Promise(async (resolve, reject) => {
    writeFile(targetPath, template, "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve;
    });
  });
}

export function pageTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/page.dart`;

  const template = `
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'vm.dart';

class ${pascalCaseName}Page extends StatefulWidget {
  const ${pascalCaseName}Page({super.key});

  @override
  State<${pascalCaseName}Page> createState() => _${pascalCaseName}PageState();
}

class _${pascalCaseName}PageState extends State<${pascalCaseName}Page> {

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return ChangeNotifierProvider(
      create: (_) => ${pascalCaseName}ViewModel(),
      builder: (context, _) {
        return Center(
          child: Consumer<${pascalCaseName}ViewModel>(
            builder: (context, model, _) {
              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text('count: \${model.count}'),
                  ElevatedButton(
                    onPressed: () {
                      model.updateCount(model.count + 1);
                    },
                    child: const Text('Increment'),
                  ),
                ],
              );
            },
          ),
        );
      },
    );
  }
}
`;

  return new Promise(async (resolve, reject) => {
    writeFile(targetPath, template, "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve;
    });
  });
}

export function vmTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/vm.dart`;
  const template = `import 'package:flutter/material.dart';

class ${pascalCaseName}ViewModel with ChangeNotifier {
  int count = 0;

  void updateCount(int value) {
    count = value;
    notifyListeners();
  }
}
`;

  return new Promise(async (resolve, reject) => {
    writeFile(targetPath, template, "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve;
    });
  });
}
